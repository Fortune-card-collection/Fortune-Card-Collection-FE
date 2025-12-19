import React from "react";
import "./Header.css";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="w-full bg-white border-b border-gray-200 z-40 flex-shrink-0">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="flex gap-1 flex-nowrap">
            <button
              onClick={() => setActiveTab("star")}
              className={`h-16 px-4 text-[15px] font-bold flex items-center transition-colors ${
                activeTab === "star"
                  ? "text-primary-blue border-b-2 border-primary-blue font-extrabold"
                  : "text-gray-dark hover:text-primary-blue"
              }`}
            >
              별자리
            </button>
            <button
              onClick={() => setActiveTab("birth")}
              className={`h-16 px-4 text-[15px] font-bold flex items-center transition-colors ${
                activeTab === "birth"
                  ? "text-primary-blue border-b-2 border-primary-blue font-extrabold"
                  : "text-gray-dark hover:text-primary-blue"
              }`}
            >
              생년월일
            </button>
            <button
              onClick={() => setActiveTab("quote")}
              className={`h-16 px-4 text-[15px] font-bold flex items-center transition-colors ${
                activeTab === "quote"
                  ? "text-primary-blue border-b-2 border-primary-blue font-extrabold"
                  : "text-gray-dark hover:text-primary-blue"
              }`}
            >
              오늘의 명언
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
