import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LessonForm from './components/LessonForm';
import ContentInput from './components/ContentInput';
import ManualNLSInput from './components/ManualNLSInput';
import ResultDisplay from './components/ResultDisplay';
import { Subject, Textbook, ManualNLSEntry } from './types';
import { generateNLSLessonPlan } from './services/geminiService';
import { Sparkles, SlidersHorizontal, ShieldCheck, Zap, Info, Check, Key } from 'lucide-react';

// App component for AI-powered Digital Competence Lesson Plan Redesign (Updated for HMR stability - v3)
const App: React.FC = () => {
  // State for Form
  const [textbook, setTextbook] = useState<Textbook>(Textbook.KNTT);
  const [subject, setSubject] = useState<Subject>(Subject.TOAN);
  const [grade, setGrade] = useState<number>(6);
  
  // Content States
  const [lessonContent, setLessonContent] = useState<string>('');
  const [textbookContent, setTextbookContent] = useState<string>('');
  const [distributionContent, setDistributionContent] = useState<string>('');
  
  // New State for Manual NLS Input
  const [manualNLSEntries, setManualNLSEntries] = useState<ManualNLSEntry[]>([
    {
      id: 'default-1',
      code: '2.1.TC1a',
      name: '2.1. Tương tác thông qua công nghệ số',
      description: 'Học sinh sử dụng Padlet để trình bày kết quả thảo luận nhóm và phản hồi chéo giữa các nhóm.'
    }
  ]);
  
  // State for Options
  const [analyzeOnly, setAnalyzeOnly] = useState(false);
  const [detailedReport, setDetailedReport] = useState(false);
  const [redesignMode, setRedesignMode] = useState(true); // Default to true as per request strength

  // API Key State
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });

  useEffect(() => {
    localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

  // App State
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!apiKey || apiKey.trim().length === 0) {
      setError("Vui lòng nhập Google Gemini API Key để tiếp tục.");
      return;
    }

    if (!lessonContent || lessonContent.trim().length === 0) {
      setError("Vui lòng tải lên file giáo án (Giáo án trống hoặc chưa được tải).");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Pass contents and manual entries to service
      const generatedText = await generateNLSLessonPlan(
        { 
            textbook, 
            subject, 
            grade, 
            content: lessonContent,
            textbookContent: textbookContent,
            distributionContent: distributionContent,
            manualNLS: manualNLSEntries 
        },
        { analyzeOnly, detailedReport, comparisonExport: false, redesignMode },
        apiKey,
        (progressText) => {
            setResult(progressText);
        }
      );

      if (!generatedText || generatedText.trim().length === 0) {
          throw new Error("AI trả về kết quả rỗng. Vui lòng thử lại với file giáo án rõ ràng hơn.");
      }

      setResult(generatedText);
    } catch (err: any) {
      console.error("Process Error:", err);
      setError(err.message || "Đã xảy ra lỗi không xác định khi kết nối với AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans pb-20 bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70"></div>
         <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-200/30 rounded-full blur-[100px] mix-blend-multiply filter opacity-70"></div>
      </div>

      <Header />
      
      <main className="max-w-6xl mx-auto px-6 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column: Inputs */}
          <div className="lg:col-span-8 space-y-8">
            <LessonForm 
              textbook={textbook} setTextbook={setTextbook}
              subject={subject} setSubject={setSubject}
              grade={grade} setGrade={setGrade}
            />
            
            <ContentInput 
                lessonContent={lessonContent} 
                setLessonContent={setLessonContent}
                textbookContent={textbookContent}
                setTextbookContent={setTextbookContent}
                distributionContent={distributionContent}
                setDistributionContent={setDistributionContent}
            />

            {/* New Manual NLS Input Section */}
            <ManualNLSInput 
                entries={manualNLSEntries}
                setEntries={setManualNLSEntries}
            />

            {/* API Key Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Key className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Cấu hình Gemini API Key</h3>
                  <p className="text-xs text-slate-500">Nhập API key của bạn để sử dụng công cụ</p>
                </div>
              </div>
              <input
                type="password"
                placeholder="Nhập Google Gemini API Key bắt đầu bằng AIza..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
              />
               <p className="text-xs text-slate-400 mt-2">API key chỉ được lưu trên trình duyệt của bạn và dùng trực tiếp để gọi AI.</p>
            </div>
            
            {/* Options Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div className="flex items-center">
                <div className="p-2 bg-slate-100 rounded-lg mr-3">
                    <SlidersHorizontal className="text-slate-600" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Cấu hình xử lý</h3>
                    <p className="text-xs text-slate-500">Tùy chỉnh cách AI làm việc</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${analyzeOnly ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                    {analyzeOnly && <Check className="text-white w-3 h-3" />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={analyzeOnly}
                    onChange={(e) => setAnalyzeOnly(e.target.checked)}
                    className="hidden" 
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Chỉ phân tích</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${detailedReport ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                    {detailedReport && <Check className="text-white w-3 h-3" />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={detailedReport}
                    onChange={(e) => setDetailedReport(e.target.checked)}
                    className="hidden" 
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Báo cáo chi tiết</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${redesignMode ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                    {redesignMode && <Check className="text-white w-3 h-3" />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={redesignMode}
                    onChange={(e) => setRedesignMode(e.target.checked)}
                    className="hidden" 
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Thiết kế lại & Nâng cấp (NLS+)</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center shadow-sm animate-shake">
                <Info className="mr-3 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}
            
            <button
              onClick={handleProcess}
              disabled={loading}
              className={`w-full py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 text-white font-bold text-lg tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/40 ${
                loading 
                  ? 'bg-slate-400 cursor-not-allowed shadow-none translate-y-0' 
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right'
              }`}
            >
              {loading ? (
                <span>Hệ thống đang xử lý...</span>
              ) : (
                <>
                  <Zap size={24} className="fill-current" />
                  <span>KÍCH HOẠT XỬ LÝ AI</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Info */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="font-bold text-xl mb-6 flex items-center">
                 <ShieldCheck className="mr-2 text-emerald-400" />
                 Quy trình chuẩn
              </h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm border border-white/20 mr-4">1</div>
                   <div>
                       <p className="font-semibold text-white">Thiết lập thông tin</p>
                       <p className="text-indigo-200 text-xs mt-1">Chọn đúng bộ sách và lớp để AI hiểu ngữ cảnh.</p>
                   </div>
                </li>
                <li className="flex">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm border border-white/20 mr-4">2</div>
                   <div>
                       <p className="font-semibold text-white">Upload tài liệu</p>
                       <p className="text-indigo-200 text-xs mt-1">Hệ thống ưu tiên file .docx để giữ định dạng tốt nhất.</p>
                   </div>
                </li>
                 <li className="flex">
                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-sm border border-emerald-400/50 mr-4 text-emerald-300">3</div>
                   <div>
                       <p className="font-semibold text-emerald-300">Nhập yêu cầu NLS</p>
                       <p className="text-indigo-200 text-xs mt-1">Nếu có yêu cầu riêng, hãy nhập thủ công để AI thực hiện chính xác.</p>
                   </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Khung năng lực số</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Khai thác dữ liệu", color: "bg-blue-500" },
                  { name: "Giao tiếp & Hợp tác", color: "bg-purple-500" },
                  { name: "Sáng tạo nội dung", color: "bg-pink-500" },
                  { name: "An toàn số", color: "bg-red-500" },
                  { name: "Giải quyết vấn đề", color: "bg-amber-500" },
                  { name: "Ứng dụng AI", color: "bg-indigo-500" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center p-2 rounded-xl hover:bg-white transition-colors cursor-default group">
                    <div className={`w-2 h-8 ${item.color} rounded-full mr-3 group-hover:scale-y-125 transition-transform`}></div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="mt-12 mb-20">
           <ResultDisplay result={result} loading={loading} />
        </div>
      </main>
      
      <footer className="mt-12 text-center text-slate-400 text-sm py-8 border-t border-slate-200/50 bg-slate-50">
        <p className="font-medium mb-2">
          Tải phần mềm MathType tại đây: <a href="https://drive.google.com/file/d/1ZBZqml2H4aTHqXI2r01rm22DzyCwmMOp/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">Link tải</a>
        </p>
        <p className="font-medium">© 2025 Thầy Giáo Tin</p>
      </footer>
    </div>
  );
};

export default App;