import { GoogleGenAI } from "@google/genai";
import { LessonInfo, ProcessingOptions } from "../types";
import { SYSTEM_INSTRUCTION, NLS_FRAMEWORK_DATA } from "../constants";

export const generateNLSLessonPlan = async (
  info: LessonInfo,
  options: ProcessingOptions,
  apiKeyParam?: string,
  onProgress?: (text: string) => void
): Promise<string> => {
  
  // Initialize inside function to avoid top-level execution issues
  const apiKey = apiKeyParam;
  if (!apiKey) {
    throw new Error("Vui lòng nhập Google Gemini API Key để tiếp tục.");
  }
  
  const ai = new GoogleGenAI({ apiKey: apiKey });

  // Tiền xử lý để loại bỏ khoảng trắng dư thừa và mã HTML trống làm tốn quota
  const optimizeTextForTokenSaving = (text: string): string => {
    if (!text) return "";
    let optimized = text;
    // Xóa các dòng trống liên tiếp (3 dòng trở lên thành 2 dòng)
    optimized = optimized.replace(/\n{3,}/g, '\n\n');
    // Xóa khoảng trắng dư thừa liên tiếp (từ 3 khoảng trắng trở lên thành 1)
    optimized = optimized.replace(/ {3,}/g, ' ');
    // Xóa các thẻ HTML vô nghĩa thường có trong word convert (như thẻ span rỗng)
    optimized = optimized.replace(/<span[^>]*>\s*<\/span>/gi, '');
    optimized = optimized.replace(/<p[^>]*>\s*<\/p>/gi, '');
    optimized = optimized.replace(/<div[^>]*>\s*<\/div>/gi, '');
    return optimized.trim();
  };

  const cleanContent = optimizeTextForTokenSaving(info.content);
  const cleanDistribution = optimizeTextForTokenSaving(info.distributionContent || "");

  // Cấu hình Model: Chuỗi fallback theo yêu cầu
  const models = [
    "gemini-3.1-pro",
    "gemini-3.0-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-pro",
    "gemini-2.5-flash"
  ];
  
  let distributionContext = "";
  if (info.distributionContent && info.distributionContent.trim().length > 0) {
      distributionContext = `
      =========================================================
      🚨 QUY TẮC TỐI THƯỢNG (KHI CÓ PPCT - STRICT MODE):
      Người dùng ĐÃ CUNG CẤP nội dung Phân phối chương trình (PPCT).
      Đây là văn bản pháp quy, bạn phải tuân thủ TUYỆT ĐỐI các yêu cầu sau:

      1. Đọc tên bài học trong "NỘI DUNG GIÁO ÁN GỐC".
      2. Tìm bài học tương ứng trong nội dung PPCT.
      3. Trích xuất NGUYÊN VĂN, CHÍNH XÁC nội dung cột "Năng lực số" (hoặc YCCĐ năng lực số) của bài học đó.
      4. Đưa nội dung trích xuất đó vào phần Mục tiêu Năng lực số.
      
      ⛔️ CÁC ĐIỀU CẤM (STRICTLY PROHIBITED):
      - CẤM TUYỆT ĐỐI việc tự ý thêm bất kỳ năng lực số nào khác không có trong PPCT của bài học này (Trừ khi có YÊU CẦU THỦ CÔNG bên dưới).
      - CẤM tự ý nâng cao hay thay đổi cấp độ nếu PPCT không yêu cầu.
      - CẤM dùng Khung năng lực số tham chiếu để bịa thêm mục tiêu. CHỈ dùng những gì PPCT ghi.
      - Nếu cột năng lực số trong PPCT để trống, thì mục tiêu NLS ghi là: "Không có (theo PPCT)".

      Đánh dấu mục tiêu này bằng dòng chữ: "(Nội dung trích xuất nguyên văn từ PPCT)".

      NỘI DUNG PPCT:
      ${cleanDistribution}
      =========================================================
      `;
  }

  // Format manual entries
  let manualContext = "";
  if (info.manualNLS && info.manualNLS.length > 0) {
      const manualItems = info.manualNLS.map(item => `- Năng lực [${item.code} - ${item.name}]:\n  Nội dung yêu cầu: ${item.description}`).join("\n\n");
      manualContext = `
      =========================================================
      🎯 YÊU CẦU CỤ THỂ TỪ GIÁO VIÊN (MANUAL INPUT - ƯU TIÊN CAO NHẤT):
      Người dùng đã chỉ định cụ thể các năng lực và nội dung yêu cầu cần tích hợp. 
      Bạn BẮT BUỘC phải đưa các nội dung này vào giáo án, ngay cả khi PPCT không đề cập.
      
      Danh sách yêu cầu:
      ${manualItems}
      =========================================================
      `;
  }

  const userPrompt = `
    DỮ LIỆU THAM CHIẾU KHUNG NĂNG LỰC SỐ:
    ${NLS_FRAMEWORK_DATA}

    THÔNG TIN GIÁO ÁN ĐẦU VÀO:
    - Bộ sách: ${info.textbook}
    - Môn học: ${info.subject}
    - Khối lớp: ${info.grade}
    
    ${distributionContext}

    ${info.textbookContent ? `
    NỘI DUNG TỪ SÁCH GIÁO KHOA (SGK) CHUẨN:
    ${info.textbookContent}
    ` : ""}

    ${manualContext}
    
    =========================================================
    NỘI DUNG GIÁO ÁN GỐC CẦN NÂNG CẤP (BIÊN SOẠN LẠI):
    ${cleanContent}
    =========================================================
    
    YÊU CẦU QUAN TRỌNG:
    - Tuân thủ tuyệt đối SYSTEM_INSTRUCTION về cấu trúc, trình bày và tích hợp NLS.
    - Đảm bảo tính sư phạm chuyên sâu, chi tiết trong từng bước tổ chức thực hiện.
    - Trả về kết quả bằng **Tiếng Việt**.
  `;

  const callModel = async (modelId: string) => {
    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Giảm nhiệt độ xuống thấp nhất để đảm bảo AI làm đúng chỉ dẫn cứng
      },
      contents: userPrompt,
    });
    
    let text = "";
    for await (const chunk of responseStream) {
        if (chunk.text) {
            text += chunk.text;
            if (onProgress) {
                onProgress(text);
            }
        }
    }

    // Post-processing to fix any rogue LaTeX chemistry formulas that the AI might still output
    // e.g., $C{15}H{31}COOH$ or $$C_{15}H_{31}COOH$$ or \( C_{15}H_{31}COOH \)
    
    // 1. Handle \( ... \) and \[ ... \] blocks by converting them to $...$ and $$...$$
    text = text.replace(/\\\((.*?)\\\)/g, (match, content) => {
      return `$${content}$`;
    });
    text = text.replace(/\\\[(.*?)\\\]/g, (match, content) => {
      return `$$${content}$$`;
    });

    // 2. Handle $...$ and $$...$$ blocks
    // We want to keep LaTeX for math formulas, so we don't remove $ signs here anymore.
    // The user will convert them manually in Word.

    // 3. Clean up escaped braces and dollar signs
    text = text.replace(/\\{/g, '{').replace(/\\}/g, '}').replace(/\\\$/g, '$');

    return text;
  };

  try {
    let lastError: any = null;
    
    for (const modelId of models) {
        try {
            console.log(`Đang thử xử lý với model: ${modelId}`);
            const text = await callModel(modelId);
            if (!text) throw new Error("API trả về kết quả rỗng.");
            return text;
        } catch (error: any) {
            console.warn(`Model ${modelId} gặp sự cố hoặc hết quota.`, error);
            lastError = error;
            // Continue to the next model in the array
        }
    }
    
    // If we reach here, all models failed
    throw new Error("Tất cả các mô hình AI đều đã hết quota hoặc gặp sự cố. Vui lòng thử lại vào ngày mai.");
  } catch (error: any) {
    console.error("Gemini API Error (All models failed):", error);
    throw new Error(error.message || "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.");
  }
};