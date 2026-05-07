import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-12 w-12 bg-white rounded-full border border-indigo-50 shadow-sm flex items-center justify-center overflow-hidden">
               <img 
                 src="https://yt3.googleusercontent.com/yTvPnt3EB5SSM279ukBxEeNlaf6_tCsOUljpHjfnlyks0HqMyHTNwv-vlddX9BifKLyFs7u_hw=s160-c-k-c0x00ffffff-no-rj" 
                 alt="Logo" 
                 className="h-full w-full object-cover"
               />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 flex items-center gap-2">
              SOẠN GIÁO ÁN NĂNG LỰC SỐ
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white uppercase tracking-tighter">AI Redesign+</span>
            </h1>
            <p className="text-slate-500 text-xs font-medium tracking-wide uppercase">Một công cụ thuộc sở hữu của giaoviendoimoi.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;