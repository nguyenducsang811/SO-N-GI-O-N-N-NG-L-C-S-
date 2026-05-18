import express from "express";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION, NLS_FRAMEWORK_DATA } from "./constants";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set NODE_ENV if not set
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
  }

  app.use(express.json({ limit: '50mb' }));

  // Helper for Vertex AI REST API call
  async function callVertexAI(authConfig: any, modelId: string, systemInstruction: string, contents: any[]) {
    const { apiKey, projectId, location } = authConfig;
    const vertexLocation = location || "us-central1";
    const vertexProject = projectId || "my-project";
    
    // REST endpoint for streaming
    const url = `https://${vertexLocation}-aiplatform.googleapis.com/v1/projects/${vertexProject}/locations/${vertexLocation}/publishers/google/models/${modelId}:streamGenerateContent?key=${apiKey}`;

    const body = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: contents.map((c: any) => ({
        role: c.role,
        parts: c.parts.map((p: any) => {
          if (p.text) return { text: p.text };
          if (p.inlineData) return { inline_data: { mime_type: p.inlineData.mimeType, data: p.inlineData.data } };
          return p;
        })
      })),
      generation_config: {
        temperature: 0.1,
        max_output_tokens: 8192,
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Vertex AI API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return response.body; 
  }

  // API Route for generating lesson plan
  app.post("/api/generate", async (req, res) => {
    const { info, options, authConfig } = req.body;
    const { apiKey, useVertexAI } = authConfig;

    if (!apiKey) {
      return res.status(400).json({ error: "Vui lòng nhập API Key để tiếp tục." });
    }

    try {
      // Set headers for streaming
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Reconstruct prompt logic from geminiService.ts
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

      const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-1.5-pro",
        "gemini-1.5-flash"
      ];

      if (useVertexAI) {
        // Vertex AI API Call (via REST)
        const responseBody = await callVertexAI(authConfig, "gemini-1.5-pro", String(SYSTEM_INSTRUCTION), [{ role: 'user', parts: parts }]);
        
        if (responseBody) {
          const reader = responseBody.getReader();
          const decoder = new TextDecoder();
          let fullText = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            // Vertex AI returns an array of JSON objects in the stream
            try {
              // The chunk might contain multiple JSON objects
              const jsonStrings = chunk.split('\n').filter(s => s.trim());
              for (const jsonStr of jsonStrings) {
                // Remove [ and ] and , if it's a standard JSON array stream
                const cleanJson = jsonStr.trim().replace(/^\[/, '').replace(/\]$/, '').replace(/^,/, '');
                if (cleanJson) {
                  const data = JSON.parse(cleanJson);
                  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (content) {
                    fullText += content;
                    res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
                  }
                }
              }
            } catch (e) {
              // Partial JSON or other issue, ignore or handle
            }
          }
        }
      } else {
        // Google AI Studio
        const genAI = new GoogleGenerativeAI(apiKey);
        let success = false;
        
        for (const modelId of modelsToTry) {
          try {
            const model = genAI.getGenerativeModel({ model: modelId, systemInstruction: String(SYSTEM_INSTRUCTION) });
            const result = await model.generateContentStream({ contents: [{ role: 'user', parts: parts }] });

            for await (const chunk of result.stream) {
              const chunkText = chunk.text();
              if (chunkText) {
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
              }
            }
            success = true;
            break;
          } catch (e) {
            console.error(`Error with model ${modelId}:`, e);
            continue;
          }
        }
        
        if (!success) {
          res.write(`data: ${JSON.stringify({ error: "Tất cả các mô hình AI đều gặp sự cố. Vui lòng kiểm tra lại API Key hoặc hạn mức." })}\n\n`);
        }
      }

      res.write('event: end\ndata: \n\n');
      res.end();
    } catch (error: any) {
      console.error("AI Error:", error);
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
    if (express.static(distPath)) {
      app.use(express.static(distPath));
    }
    app.get('*', (req, res) => {
      const indexPath = path.join(process.cwd(), 'dist', 'index.html');
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

startServer();
