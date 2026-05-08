import React, { useState, useEffect } from 'react';
// Adding comment for HMR stability
import { Plus, Trash2, Target } from 'lucide-react';
import { NLS_COMPONENT_OPTIONS, NLS_LEVEL_DETAILS } from '../constants';
import { ManualNLSEntry } from '../types';

interface ManualNLSInputProps {
  entries: ManualNLSEntry[];
  setEntries: (entries: ManualNLSEntry[]) => void;
}

const ManualNLSInput: React.FC<ManualNLSInputProps> = ({ entries, setEntries }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedCode, setSelectedCode] = useState<string>(NLS_COMPONENT_OPTIONS[0].code);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [description, setDescription] = useState<string>('');

  // Update level selection when component changes
  useEffect(() => {
    setSelectedLevel("");
    setDescription("");
  }, [selectedCode]);

  // Handle Level Change
  const handleLevelChange = (levelCode: string) => {
    setSelectedLevel(levelCode);
    
    // Auto-fill description based on selected level
    if (levelCode) {
        const details = NLS_LEVEL_DETAILS[selectedCode];
        const detail = details?.find(d => d.code === levelCode);
        if (detail) {
            setDescription(detail.desc);
        }
    } else {
        setDescription("");
    }
  };

  const handleAdd = () => {
    if (!description.trim()) {
        alert("Vui lòng nhập nội dung mô tả năng lực.");
        return;
    }

    const component = NLS_COMPONENT_OPTIONS.find(opt => opt.code === selectedCode);
    const finalCode = selectedLevel ? `${selectedCode}.${selectedLevel}` : selectedCode;

    const newEntry: ManualNLSEntry = {
      id: Date.now().toString(),
      code: finalCode,
      name: component ? component.label : finalCode,
      description: description.trim()
    };

    setEntries([...entries, newEntry]);
    
    // Reset fields except component (for easier repeated entry)
    setSelectedLevel("");
    setDescription(""); 
  };

  const handleRemove = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  // Get available levels for current component
  const availableLevels = NLS_LEVEL_DETAILS[selectedCode] || [];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 border border-white/50 backdrop-blur-sm mt-6">
      <div 
        className="flex items-center mb-2 cursor-pointer select-none" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="mr-4 flex items-center justify-center">
          <input 
            type="checkbox" 
            checked={isExpanded} 
            onChange={() => setIsExpanded(!isExpanded)}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 border-slate-300 cursor-pointer"
          />
        </div>
        <div className="p-2 bg-pink-50 rounded-lg mr-3">
          <Target size={20} className="text-pink-600" />
        </div>
        <div>
           <h2 className="text-xl font-bold text-slate-800">Yêu cầu Năng lực số cụ thể (Tùy chọn)</h2>
           <p className="text-xs text-slate-500">Tích vào đây nếu bạn muốn chỉ định rõ thành phần và mức độ NLS cho AI</p>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Dropdown 1: Thành phần (Component) */}
            <div className="md:col-span-4">
               <label className="block text-xs font-bold text-slate-600 mb-2 uppercase">1. Thành phần</label>
               <div className="relative">
                 <select
                   value={selectedCode}
                   onChange={(e) => setSelectedCode(e.target.value)}
                   className="block w-full rounded-xl border-0 bg-slate-50 py-3 px-4 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm font-medium transition-shadow cursor-pointer hover:bg-slate-100"
                 >
                   {NLS_COMPONENT_OPTIONS.map((opt) => (
                     <option key={opt.code} value={opt.code}>
                       {opt.label}
                     </option>
                   ))}
                 </select>
               </div>
            </div>

            {/* Dropdown 2: Mức độ (Level) */}
            <div className="md:col-span-3">
               <label className="block text-xs font-bold text-slate-600 mb-2 uppercase">2. Mức độ (Tùy chọn)</label>
               <div className="relative">
                 <select
                   value={selectedLevel}
                   onChange={(e) => handleLevelChange(e.target.value)}
                   disabled={availableLevels.length === 0}
                   className={`block w-full rounded-xl border-0 bg-slate-50 py-3 px-4 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm font-medium transition-shadow cursor-pointer hover:bg-slate-100 
                      ${availableLevels.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                 >
                   <option value="">-- Tự nhập --</option>
                   {availableLevels.map((lvl) => (
                     <option key={lvl.code} value={lvl.code}>
                       {lvl.code}
                     </option>
                   ))}
                 </select>
               </div>
            </div>

            {/* Input Description */}
            <div className="md:col-span-5">
               <label className="block text-xs font-bold text-slate-600 mb-2 uppercase">3. Nội dung yêu cầu</label>
               <textarea
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="Mô tả năng lực hoặc hoạt động mong muốn..."
                 rows={2}
                 className="block w-full rounded-xl border-0 bg-slate-50 py-2.5 px-4 text-slate-700 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm sm:leading-6 transition-shadow"
               />
            </div>

            {/* Add Button */}
            <div className="md:col-span-12 pt-2 flex justify-end">
               <button
                 onClick={handleAdd}
                 className="flex items-center justify-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200 active:transform active:scale-95"
               >
                 <Plus size={18} />
                 <span>Thêm vào danh sách</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Added Entries (Always visible if entries exist) */}
      {entries.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh sách đã chọn ({entries.length})</h3>
          </div>
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-start bg-slate-50 border border-slate-200 rounded-xl p-4 group hover:border-pink-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    <span className="inline-block px-2 py-1 rounded bg-pink-100 text-pink-700 text-xs font-bold">
                    {entry.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                        {NLS_COMPONENT_OPTIONS.find(o => entry.code.startsWith(o.code))?.label.replace(/^\d\.\d\.\s/, '')}
                    </span>
                </div>
                <p className="text-slate-700 text-sm mt-1">
                  {entry.description}
                </p>
              </div>
              <button
                onClick={() => handleRemove(entry.id)}
                className="ml-3 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="Xóa"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualNLSInput;