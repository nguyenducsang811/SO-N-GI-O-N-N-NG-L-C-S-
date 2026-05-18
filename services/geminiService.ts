import { LessonInfo, ProcessingOptions } from "../types";

// Xuất danh sách model ra để giao diện (UI) có thể import và tạo Menu Dropdown cho bạn chọn
export const GEMINI_MODELS = [
  // Dòng 3.1 mới nhất
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-lite",
  
  // Dòng 3.0
  "gemini-3.0-pro",
  "gemini-3.0-pro-preview", 
  "gemini-3.0-flash",
  "gemini-3.0-flash-preview",

  // Dòng 2.5
  "gemini-2.5-pro-preview",
  "gemini-2.5-flash-preview",

  // Dòng 1.5 ổn định (Stable)
  "gemini-1.5-pro",
  "gemini-1.5-flash"
];

export const generateNLSLessonPlan = async (
  info: LessonInfo,
  options: ProcessingOptions,
  authConfig: any,
  onProgress?: (text: string) => void
): Promise<string> => {
  // Ghi chú nhỏ: Đảm bảo rằng model bạn chọn trên giao diện đã được truyền vào biến 'options' hoặc 'authConfig' để gửi lên backend nhé.
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ info, options, authConfig })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("Could not start stream");

  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const jsonStr = line.substring(6).trim();
        if (!jsonStr) continue;
        try {
          const data = JSON.parse(jsonStr);
          if (data.error) throw new Error(data.error);
          if (data.text) {
            fullText += data.text;
            if (onProgress) onProgress(fullText);
          }
        } catch (e) {
          // Ignore parsing errors for non-JSON lines or partial bits
        }
      } else if (line.startsWith("event: end")) {
        return fullText;
      }
    }
  }

  return fullText;
};
