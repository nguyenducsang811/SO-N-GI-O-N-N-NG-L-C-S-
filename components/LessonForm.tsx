import React, { useEffect } from 'react';
import { Subject, Textbook } from '../types';
import { LayoutDashboard, Book, Layers } from 'lucide-react';

interface LessonFormProps {
  textbook: Textbook;
  setTextbook: (val: Textbook) => void;
  subject: Subject;
  setSubject: (val: Subject) => void;
  grade: number;
  setGrade: (val: number) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  textbook,
  setTextbook,
  subject,
  setSubject,
  grade,
  setGrade,
}) => {
  // Helper for select arrow styling
  const selectClass = "appearance-none block w-full rounded-xl border-0 bg-slate-50 py-3.5 px-4 text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow cursor-pointer font-medium hover:bg-slate-100";

  // Order grades starting from 6, then primary
  const gradeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const primarySubjects = [
    Subject.TOAN,
  ];

  const secondarySubjects = [
    Subject.TOAN,
  ];

  const highSchoolSubjects = [
    Subject.TOAN,
  ];

  const isPrimary = grade >= 1 && grade <= 5;
  const isSecondary = grade >= 6 && grade <= 9;
  
  const currentSubjects = isPrimary 
    ? primarySubjects 
    : isSecondary 
      ? secondarySubjects 
      : highSchoolSubjects;

  useEffect(() => {
    if (!currentSubjects.includes(subject)) {
      setSubject(currentSubjects[0]);
    }
  }, [grade, subject, currentSubjects, setSubject]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 border border-white/50 backdrop-blur-sm relative overflow-hidden">
       {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
        <LayoutDashboard className="mr-2 text-indigo-500" size={24} />
        Thông tin bài dạy
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Textbook */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Bộ sách</label>
          <div className="relative">
            <select
              value={textbook}
              onChange={(e) => setTextbook(e.target.value as Textbook)}
              className={selectClass}
            >
              {Object.values(Textbook).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-indigo-600">
               <Book size={16} />
            </div>
          </div>
        </div>

        {/* Grade */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Khối lớp</label>
          <div className="relative">
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className={selectClass}
            >
              {gradeOptions.map((g) => (
                <option key={g} value={g}>Lớp {g}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pink-600">
              <Layers size={16} />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Môn học</label>
          <div className="relative">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              className={selectClass}
            >
              {currentSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-600">
               {/* Just a decorative dot or icon */}
               <div className="w-2 h-2 rounded-full bg-current"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonForm;