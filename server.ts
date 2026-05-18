import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, NLS_FRAMEWORK_DATA } from "./constants";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set NODE_ENV if not set
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
  }

  app.use(express.json({ limit: '50mb' }));

  // API Route for generating lesson plan
  app.post("/api/generate", async (req, res) => {
    const { info, options, authConfig } = req.body;
    
    // We prioritize the API Key provided by the user in the UI
    const effectiveApiKey = authConfig?.apiKey || process.env.GEMINI_API_KEY;

    if (!effectiveApiKey) {
      return res.status(400).json({ error: "Hệ thống chưa được cấu hình API Key. Vui lòng nhập API Key của bạn trong phần 'Cấu hình AI API Key'." });
    }

    try {
      // Set headers for streaming
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Create a fresh client instance to use the effective API Key
      const requestAI = new GoogleGenAI({
        apiKey: effectiveApiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const optimizeTextForTokenSaving = (text: string): string => {
        if (!text) return "";
        if (text.startsWith("data:image/") || text.startsWith("data:application/pdf")) return text; 
        let optimized = text.replace(/\n{3,}/g, '\n\n').replace(/ {3,}/g, ' ');
        optimized = optimized.replace(/<span[^>]*>\s*<\/span>/gi, '').replace(/<p[^>]*>\s*<\/p>/gi, '').replace(/<div[^>]*>\s*<\/div>/gi, '');
        return optimized.trim();
      };

      const cleanContent = optimizeTextForTokenSaving(info.content);
      const cleanDistribution = optimizeTextForTokenSaving(info.distributionContent || "");
      const cleanTextbook = optimizeTextForTokenSaving(info.textbookContent || "");

      let distributionContext = "";
      if (info.distributionContent && info.distributionContent.trim().length > 0) {
          distributionContext = `
          =========================================================
          🚨 QUY TẮC TỐI THƯỢNG (KHI CÓ FILE HỆ THỐNG HOẠT ĐỘNG - STRICT MODE):
          Người dùng ĐÃ CUNG CẤP nội dung HỆ THỐNG HOẠT ĐỘNG DẠY HỌC TOÁN TÍCH HỢP NĂNG LỰC SỐ (THCS).
          Đây là văn bản pháp quy, bạn phải tuân thủ TUYỆT ĐỐI các yêu cầu sau:
          1. Đọc tên bài học trong "NỘI DUNG GIÁO ÁN GỐC".
          2. Tìm bài học tương ứng trong nội dung Hệ thống hoạt động.
          3. Trích xuất NGUYÊN VĂN, CHÍNH XÁC nội dung các yêu cầu về "Năng lực số" của bài học đó trong văn bản này.
          4. Đưa nội dung trích xuất đó vào phần Mục tiêu Năng lực số.
          NỘI DUNG HỆ THỐNG HOẠT ĐỘNG DẠY HỌC TÍCH HỢP NLS:
          ${cleanDistribution}
          =========================================================
          `;
      }

      let manualContext = "";
      if (info.manualNLS && info.manualNLS.length > 0) {
          const manualItems = info.manualNLS.map((item: any) => `- Năng lực [${item.code} - ${item.name}]:\n  Nội dung yêu cầu: ${item.description}`).join("\n\n");
          manualContext = `
          =========================================================
          🎯 YÊU CẦU CỤ THỂ TỪ GIÁO VIÊN (MANUAL INPUT):
          ${manualItems}
          =========================================================
          `;
      }

      const getPartFromContent = (text: string, label: string): any[] => {
        if (!text) return [];
        if (text.startsWith("data:")) {
          const match = text.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            return [
              { text: `\n${label}:\n` },
              { inlineData: { data: match[2], mimeType: match[1] } }
            ];
          }
        }
        return [{ text: `\n${label}:\n${text}\n` }];
      };

      const parts: any[] = [];
      parts.push({ text: `DỮ LIỆU THAM CHIẾU KHUNG NĂNG LỰC SỐ:\n${String(NLS_FRAMEWORK_DATA)}\n` });
      parts.push({ text: `THÔNG TIN GIÁO ÁN ĐẦU VÀO:\n- Bộ sách: ${String(info.textbook)}\n- Môn học: ${String(info.subject)}\n- Khối lớp: ${String(info.grade)}\n` });
      if (distributionContext) parts.push({ text: String(distributionContext) });
      else if (cleanDistribution) parts.push(...getPartFromContent(cleanDistribution, "NỘI DUNG HỆ THỐNG HOẠT ĐỘNG DẠY HỌC TÍCH HỢP NLS"));
      if (cleanTextbook) parts.push(...getPartFromContent(cleanTextbook, "NỘI DUNG TỪ SÁCH GIÁO KHOA (SGK) CHUẨN"));
      if (manualContext) parts.push({ text: String(manualContext) });
      parts.push(...getPartFromContent(cleanContent, "NỘI DUNG GIÁO ÁN GỐC CẦN NÂNG CẤP (BIÊN SOẠN LẠI)"));

      // Use the model provided by the user, fallback to a sensible default if missing
      const requestedModel = authConfig?.selectedModel || "gemini-2.0-flash-001";
      
      // Basic mapping for specific preview/lite models if the SDK needs canonical names
      // (The SDK usually handles these strings directly if they are valid model IDs)
      const modelId = requestedModel;
      
      try {
        const result = await requestAI.models.generateContentStream({
          model: modelId,
          config: {
            systemInstruction: String(SYSTEM_INSTRUCTION),
            temperature: 0.1,
            maxOutputTokens: 8192,
          },
          contents: [{ role: 'user', parts: parts }]
        });

        for await (const chunk of result) {
          const chunkText = chunk.text;
          if (chunkText) {
            res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
          }
        }
      } catch (e: any) {
        console.error(`AI Error with ${modelId}:`, e);
        // Fallback to gemini-1.5-flash if 2.0 is not available on the key
        try {
          const fallbackModel = "gemini-1.5-flash";
          const fallbackResult = await requestAI.models.generateContentStream({
            model: fallbackModel,
            config: {
              systemInstruction: String(SYSTEM_INSTRUCTION),
              temperature: 0.1,
            },
            contents: [{ role: 'user', parts: parts }]
          });
          for await (const chunk of fallbackResult) {
            const chunkText = chunk.text;
            if (chunkText) res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
          }
        } catch (innerE: any) {
           res.write(`data: ${JSON.stringify({ error: `Lỗi kết nối AI: ${innerE.message}. Vui lòng kiểm tra lại API Key hoặc hạn mức Quota.` })}\n\n`);
        }
      }

      res.write('event: end\ndata: \n\n');
      res.end();
    } catch (error: any) {
      console.error("Server Error:", error);
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

startServer();

