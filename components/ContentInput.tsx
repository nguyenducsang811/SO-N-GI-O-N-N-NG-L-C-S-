import React, { useRef, useState } from 'react';
import { Loader2, CheckCircle2, FileText, Upload, AlertTriangle, FileBarChart } from 'lucide-react';
import JSZip from 'jszip';

interface ContentInputProps {
  lessonContent: string;
  setLessonContent: (val: string) => void;
  textbookContent: string;
  setTextbookContent: (val: string) => void;
  distributionContent: string;
  setDistributionContent: (val: string) => void;
}

// Khai báo thư viện ngoại
declare const mammoth: any;
declare const pdfjsLib: any;

type BoxType = 'lesson' | 'textbook' | 'distribution';

interface UploadBoxProps {
  title: string;
  subTitle: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  fileName: string | null;
  isProcessing: boolean;
  type: BoxType;
  hasContent: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: BoxType) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ 
  title, 
  subTitle, 
  inputRef, 
  fileName, 
  isProcessing, 
  type,
  hasContent,
  onFileChange
}) => (
  <div 
    onClick={() => inputRef.current?.click()}
    className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-8 transition-all duration-300 cursor-pointer text-center h-full flex flex-col justify-center
      ${hasContent 
          ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50' 
          : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/30'
      }
    `}
  >
    <input 
      type="file" 
      ref={inputRef}
      onChange={(e) => onFileChange(e, type)}
      accept=".pdf,.docx" 
      className="hidden" 
    />
    
    <div className="flex flex-col items-center justify-center relative z-10">
      {isProcessing ? (
         <div className="p-4 bg-white rounded-full shadow-lg mb-3">
             <Loader2 className="text-indigo-600 animate-spin" size={32} />
         </div>
      ) : hasContent ? (
         <div className="p-4 bg-white rounded-full shadow-lg shadow-emerald-200 mb-3">
           <CheckCircle2 className="text-emerald-500" size={32} />
         </div>
      ) : (
        <div className={`p-4 rounded-full shadow-lg mb-4 transition-transform group-hover:-translate-y-1
            ${type === 'lesson' ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
           {type === 'lesson' ? <FileText size={28} /> : (type === 'textbook' ? <Upload size={28} /> : <FileBarChart size={28} />)}
        </div>
      )}

      {isProcessing ? (
           <p className="text-sm font-semibold text-slate-600 animate-pulse">Đang phân tích...</p>
      ) : hasContent ? (
          <>
              <p className="text-sm font-bold text-emerald-800 break-all px-2 line-clamp-1">{fileName}</p>
              <p className="text-xs font-medium text-emerald-600 mt-1 bg-emerald-100 px-3 py-1 rounded-full">Đã sẵn sàng</p>
          </>
      ) : (
          <>
              <p className="text-base font-bold text-slate-700">{title}</p>
              <p className="text-xs text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">{subTitle}</p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload size={12} />
                  <span>Bấm để chọn file</span>
              </div>
          </>
      )}
    </div>
  </div>
);

const ContentInput: React.FC<ContentInputProps> = ({ 
  lessonContent, 
  setLessonContent,
  textbookContent,
  setTextbookContent,
  distributionContent,
  setDistributionContent
}) => {
  const lessonInputRef = useRef<HTMLInputElement>(null);
  const textbookInputRef = useRef<HTMLInputElement>(null);
  const distInputRef = useRef<HTMLInputElement>(null);
  
  const [processingLesson, setProcessingLesson] = useState(false);
  const [processingTextbook, setProcessingTextbook] = useState(false);
  const [processingDist, setProcessingDist] = useState(false);
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [textbookFileName, setTextbookFileName] = useState<string | null>(null);
  const [distFileName, setDistFileName] = useState<string | null>(null);

  const processFile = async (file: File, type: BoxType) => {
    let setProcessing, setContent, setFileName;

    switch(type) {
        case 'lesson':
            setProcessing = setProcessingLesson;
            setContent = setLessonContent;
            setFileName = setLessonFileName;
            break;
        case 'textbook':
            setProcessing = setProcessingTextbook;
            setContent = setTextbookContent;
            setFileName = setTextbookFileName;
            break;
        case 'distribution':
            setProcessing = setProcessingDist;
            setContent = setDistributionContent;
            setFileName = setDistFileName;
            break;
    }

    setProcessing(true);
    setFileName(file.name);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      let text = "";

      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        text = await extractTextFromPDF(arrayBuffer);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        file.name.endsWith(".docx")
      ) {
        text = await extractTextFromDOCX(arrayBuffer);
      } else {
        alert("Định dạng file không được hỗ trợ. Vui lòng chọn PDF hoặc DOCX.");
        setFileName(null);
        setProcessing(false);
        return;
      }

      if (!text.trim()) {
        alert("Không thể đọc được nội dung văn bản từ file này. Có thể file chứa ảnh scan?");
        setFileName(null);
      } else {
        setContent(text);
      }

    } catch (error) {
      console.error("Error processing file:", error);
      alert("Có lỗi xảy ra khi đọc file.");
      setFileName(null);
    } finally {
      setProcessing(false);
    }
  };

  // Preprocess and extraction functions remain the same
  const preprocessDOCXMath = async (arrayBuffer: ArrayBuffer): Promise<ArrayBuffer> => {
    try {
      const zip = await JSZip.loadAsync(arrayBuffer);
      const docXmlFile = zip.file("word/document.xml");
      if (!docXmlFile) return arrayBuffer;

      let xml = await docXmlFile.async("string");

      // Replace OMML math blocks with plain text wrapped in [MATH: ...]
      xml = xml.replace(/<m:oMath[^>]*>([\s\S]*?)<\/m:oMath>/g, (match) => {
        // Strip all XML tags to get the raw text
        let text = match.replace(/<[^>]+>/g, '');
        // Decode common XML entities first
        text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        // Then re-encode < and > so mammoth doesn't treat them as HTML tags and strip them
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<w:r><w:t xml:space="preserve">[MATH: ${text}]</w:t></w:r>`;
      });

      zip.file("word/document.xml", xml);
      return await zip.generateAsync({ type: "arraybuffer" });
    } catch (e) {
      console.error("Error preprocessing DOCX math:", e);
      return arrayBuffer; // fallback to original if error
    }
  };

  const extractTextFromDOCX = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    if (typeof mammoth === 'undefined') return "";
    try {
        const processedBuffer = await preprocessDOCXMath(arrayBuffer);
        const result = await mammoth.convertToHtml({ arrayBuffer: processedBuffer });
        let html = result.value;
        html = html.replace(/<img[^>]*src="data:image\/[^;]+;base64,[^"]+"[^>]*>/g, ' [HÌNH ẢNH ĐÃ LƯỢC BỎ] ');
        return html;
    } catch (e) {
        console.error("Mammoth error", e);
        return "";
    }
  };

  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    if (typeof pdfjsLib === 'undefined') return "";
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n\n";
    }
    return fullText;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: BoxType) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, type);
    e.target.value = '';
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 border border-white/50 backdrop-blur-sm mt-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg mr-3">
            <Upload size={20} className="text-indigo-600"/>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Tài liệu đầu vào (Biên soạn lại 1 bài học)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ô Upload Giáo án */}
        <div className="flex flex-col h-full">
            <UploadBox 
                title="Giáo án gốc (KHBD)" 
                subTitle="File giáo án cũ làm tài liệu định hướng (tham khảo 30%)." 
                inputRef={lessonInputRef}
                fileName={lessonFileName}
                isProcessing={processingLesson}
                type="lesson"
                hasContent={!!lessonContent}
                onFileChange={handleFileChange}
            />
             {!lessonContent && (
                <div className="flex items-center justify-center mt-3 text-rose-500 text-xs font-medium">
                    <AlertTriangle size={12} className="mr-1.5"/>
                    <span>Bắt buộc</span>
                </div>
            )}
        </div>

        {/* Ô Upload Tài liệu SGK */}
        <div className="flex flex-col h-full">
            <UploadBox 
                title="Tài liệu SGK" 
                subTitle="File nội dung chuẩn trong SGK để AI làm căn cứ biên soạn lại." 
                inputRef={textbookInputRef}
                fileName={textbookFileName}
                isProcessing={processingTextbook}
                type="textbook"
                hasContent={!!textbookContent}
                onFileChange={handleFileChange}
            />
        </div>

        {/* Ô Upload PPCT */}
        <div className="flex flex-col h-full">
            <UploadBox 
                title="Tải lên PPCT" 
                subTitle="Trích xuất chính xác năng lực theo quy định nhà trường." 
                inputRef={distInputRef}
                fileName={distFileName}
                isProcessing={processingDist}
                type="distribution"
                hasContent={!!distributionContent}
                onFileChange={handleFileChange}
            />
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 border border-indigo-200/50 rounded-2xl p-5">
           <p className="text-sm font-bold text-indigo-900 mb-2 flex items-center">
               <FileText size={16} className="mr-2" />
               Ưu tiên chế độ Thiết kế lại (AI Redesign+)
           </p>
           <p className="text-xs text-indigo-700 leading-relaxed">
               Hệ thống sẽ giữ lại Mục tiêu và Mạch kiến thức cốt lõi của giáo án gốc, nhưng sẽ biên soạn mới 70% nội dung hoạt động (đổi mới câu hỏi, tình huống, phương pháp dạy học) dựa trên SGK và NLS.
           </p>
      </div>

      {/* Cảnh báo khối lượng Upload để tiết kiệm quota */}
      <div className="mt-6 bg-amber-50 border border-amber-200/60 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
             <AlertTriangle size={18} />
          </div>
          <div className="text-sm text-amber-800">
             <strong>Lời khuyên để tránh lỗi và tối ưu Quota: </strong>
             Xin đừng đưa cả 1 kỳ học hoặc hàng chục trang giáo án vào cùng 1 lúc! Hãy tải <strong>từng bài một (1 - 3 tiết)</strong>. Việc tải khối lượng khổng lồ sẽ khiến AI bị ngợp sập bộ nhớ, làm hỏng bảng biểu và trừ một lúc sạch Quota sử dụng của bạn.
          </div>
      </div>
    </div>
  );
};
export default ContentInput;