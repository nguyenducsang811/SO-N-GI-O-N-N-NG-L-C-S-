import React, { useRef, useState } from 'react';
import { Loader2, CheckCircle2, FileText, Upload, TriangleAlert, FileBarChart } from 'lucide-react';
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
  onClear: (type: BoxType) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ 
  title, 
  subTitle, 
  inputRef, 
  fileName, 
  isProcessing, 
  type,
  hasContent,
  onFileChange,
  onClear
}) => (
  <div 
    className={`group relative overflow-hidden rounded-2xl border-2 border-dashed p-8 transition-all duration-300 text-center h-full flex flex-col justify-center
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
      accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.webp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,image/*,text/plain" 
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
      disabled={isProcessing}
    />
    
    {hasContent && !isProcessing && (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClear(type);
        }}
        className="absolute top-3 right-3 p-1.5 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors z-30"
        title="Gỡ bỏ tài liệu này"
      >
        <TriangleAlert size={14} />
      </button>
    )}
    
    <div className="flex flex-col items-center justify-center relative z-10 pointer-events-none">
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
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-indigo-500 font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity">
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

    if (!setProcessing || !setContent || !setFileName) return;

    setProcessing(true);
    setFileName(file.name);
    
    try {
      let text = "";
      const fileNameLower = file.name.toLowerCase();

      // Check file size, if > 30MB warn in console but proceed
      if (file.size > 30 * 1024 * 1024) {
        console.warn("File size > 30MB. This might be slow.");
      }

      if (file.type === "application/pdf" || fileNameLower.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        try {
          text = await extractTextFromPDF(arrayBuffer);
        } catch (e) {
          console.error("PDF text extraction failed:", e);
          text = "";
        }
        
        // If text is too short, automatically try Vision mode (sending the PDF directly to Gemini)
        if (!text || text.trim().length < 100) {
            text = await readFileAsDataURL(file);
        }
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        fileNameLower.endsWith(".docx")
      ) {
        const arrayBuffer = await file.arrayBuffer();
        text = await extractTextFromDOCX(arrayBuffer);
      } else if (fileNameLower.endsWith(".doc")) {
        alert("Định dạng .doc (Word cũ) không được hỗ trợ xử lý tự động tốt. Vui lòng 'Save As' sang định dạng .docx trên máy tính để giữ đầy đủ định dạng và nội dung, sau đó tải lên lại.");
        setFileName(null);
        setProcessing(false);
        return;
      } else if (file.type.startsWith("image/") || /\.(jpg|jpeg|png)$/.test(fileNameLower)) {
        // Handle images
        text = await readFileAsDataURL(file);
      } else if (file.type === "text/plain" || fileNameLower.endsWith(".txt")) {
        text = await file.text();
      } else {
        alert("Định dạng file không được hỗ trợ. Hệ thống hỗ trợ: Docx, PDF, Ảnh (Jpg, Png), Txt.");
        setFileName(null);
        setProcessing(false);
        return;
      }

      if (!text || !text.trim()) {
        alert("Không thể đọc được nội dung từ file này. Vui lòng kiểm tra lại file hoặc thử định dạng khác.");
        setFileName(null);
        setContent(""); 
      } else {
        setContent(text);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Có lỗi xảy ra khi đọc file. Chi tiết: " + (error instanceof Error ? error.message : String(error)));
      setFileName(null);
    } finally {
      setProcessing(false);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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
    const mammothLib = (window as any).mammoth;
    if (!mammothLib) {
        alert("Lỗi: Thư viện đọc file Word (Mammoth) chưa được tải. Vui lòng kiểm tra kết nối mạng.");
        return "";
    }
    try {
        const processedBuffer = await preprocessDOCXMath(arrayBuffer);
        const result = await mammothLib.convertToHtml({ arrayBuffer: processedBuffer });
        let html = result.value || "";
        html = html.replace(/<img[^>]*src="data:image\/[^;]+;base64,[^"]+"[^>]*>/g, ' [HÌNH ẢNH ĐÃ LƯỢC BỎ] ');
        return html;
    } catch (e) {
        console.error("Mammoth error", e);
        return "";
    }
  };

  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const pdfLib = (window as any).pdfjsLib;
    if (!pdfLib) {
        alert("Lỗi: Thư viện đọc file PDF chưa được tải. Vui lòng kiểm tra kết nối mạng.");
        return "";
    }
    try {
        const pdf = await pdfLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }
        return fullText;
    } catch (e) {
        console.error("PDF.js error", e);
        return "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: BoxType) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`Uploading file for ${type}: ${file.name}`);
      processFile(file, type);
    }
    e.target.value = '';
  };

  const clearContent = (type: BoxType) => {
    switch(type) {
      case 'lesson':
        setLessonContent('');
        setLessonFileName(null);
        break;
      case 'textbook':
        setTextbookContent('');
        setTextbookFileName(null);
        break;
      case 'distribution':
        setDistributionContent('');
        setDistFileName(null);
        break;
    }
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
                subTitle="File giáo án cũ làm tài liệu định hướng (Docx, PDF, Ảnh, Txt)." 
                inputRef={lessonInputRef}
                fileName={lessonFileName}
                isProcessing={processingLesson}
                type="lesson"
                hasContent={!!lessonContent}
                onFileChange={handleFileChange}
                onClear={clearContent}
            />
             {!lessonContent && (
                <div className="flex items-center justify-center mt-3 text-rose-500 text-xs font-medium">
                    <TriangleAlert size={12} className="mr-1.5"/>
                    <span>Bắt buộc</span>
                </div>
            )}
        </div>

        {/* Ô Upload Tài liệu SGK */}
        <div className="flex flex-col h-full">
            <UploadBox 
                title="Tài liệu SGK" 
                subTitle="File nội dung chuẩn trong SGK để AI làm căn cứ (Docx, PDF, Ảnh, Txt)." 
                inputRef={textbookInputRef}
                fileName={textbookFileName}
                isProcessing={processingTextbook}
                type="textbook"
                hasContent={!!textbookContent}
                onFileChange={handleFileChange}
                onClear={clearContent}
            />
        </div>

        {/* Ô Upload Hệ thống hoạt động */}
        <div className="flex flex-col h-full">
            <UploadBox 
                title="HỆ THỐNG HOẠT ĐỘNG DẠY HỌC TOÁN TÍCH HỢP NĂNG LỰC SỐ (THCS)" 
                subTitle="Trích xuất chính xác năng lực từ hệ thống hoạt động tích hợp NLS (Docx, PDF, Ảnh, Txt)." 
                inputRef={distInputRef}
                fileName={distFileName}
                isProcessing={processingDist}
                type="distribution"
                hasContent={!!distributionContent}
                onFileChange={handleFileChange}
                onClear={clearContent}
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
             <TriangleAlert size={18} />
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