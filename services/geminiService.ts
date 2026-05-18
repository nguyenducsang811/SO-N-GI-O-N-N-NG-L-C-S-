import { LessonInfo, ProcessingOptions } from "../types";

export const generateNLSLessonPlan = async (
  info: LessonInfo,
  options: ProcessingOptions,
  authConfig: any,
  onProgress?: (text: string) => void
): Promise<string> => {
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
