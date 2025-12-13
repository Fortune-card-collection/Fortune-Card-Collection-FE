import React, {useState} from "react";
import "./Header.css";

export default function Header({ activeTab, setActiveTab }) {

  return (
    <header className="bg-white border-b border-gray-200 z-40">
      <div className="max-w-[1100px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-1">
            <button onClick={() => setActiveTab('star')} className={`h-16 px-4 text-[15px] font-bold flex items-center transition-colors ${activeTab === 'star' ? 'text-[#3da8f5] border-b-2 border-[#3da8f5] font-extrabold' : 'text-[#444] hover:text-[#3da8f5]'}`}>별자리</button>
            <button onClick={() => setActiveTab('birth')} className={`h-16 px-4 text-[15px] font-bold flex items-center transition-colors ${activeTab === 'birth' ? 'text-[#3da8f5] border-b-2 border-[#3da8f5] font-extrabold' : 'text-[#444] hover:text-[#3da8f5]'}`}>생년월일</button>
            <button onClick={() => setActiveTab('quote')} className={`h-16 px-4 text-[15px] font-bold flex items-center transition-colors ${activeTab === 'quote' ? 'text-[#3da8f5] border-b-2 border-[#3da8f5] font-extrabold' : 'text-[#444] hover:text-[#3da8f5]'}`}>오늘의 명언</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
