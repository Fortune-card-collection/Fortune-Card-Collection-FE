import React, {useState} from 'react';

import { X, Quote,  } from 'lucide-react';

const QUOTES = [
  { text: "가장 큰 위험은 위험 없는 삶이다.", author: "스티븐 코비" },
  { text: "행복은 이미 만들어져 있는 것이 아니다.", author: "달라이 라마" },
  { text: "웃어야 복이 온다.", author: "한국 속담" }
];

// 3. 오늘의 명언 카드 선택
const ChooseCard = () => {

  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quotes] = useState(() => [...QUOTES].sort(() => 0.5 - Math.random()));

  const handleCardClick = (index) => {
    setSelectedCard(index);
    setTimeout(() => setIsFlipped(true), 600);
  };
  const closeCard = () => {
    setIsFlipped(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto max-w-[1100px] mx-auto">
      {/* <div className="text-center mb-6">
         <Quote className="w-10 h-10 text-[#1e3a8a] mx-auto mb-2 fill-current opacity-20" />
         <h3 className="text-xl font-bold text-[#333] mb-1 font-serif">오늘의 지혜를 구하세요</h3>
         <p className="text-sm text-[#888]">마음이 끌리는 카드를 선택하면, 당신을 위한 조언이 나타납니다.</p>
      </div> */}

      <div className="relative w-full bg-[#1a1a2e] rounded-3xl p-12 overflow-hidden shadow-inner border-[6px] border-[#2d2d44]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] to-transparent opacity-5 pointer-events-none"></div>
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#d4af37] opacity-30 rounded-tl-xl"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#d4af37] opacity-30 rounded-tr-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#d4af37] opacity-30 rounded-bl-xl"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#d4af37] opacity-30 rounded-br-xl"></div>

        <div className="flex justify-center gap-6 md:gap-12 relative z-10">
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className="relative w-40 h-64 md:w-48 md:h-72 cursor-pointer group transition-all duration-300 hover:-translate-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              onClick={() => handleCardClick(index)}
            >
              <div className="w-full h-full rounded-xl shadow-2xl bg-[#1e293b] border-2 border-[#475569] overflow-hidden flex items-center justify-center relative transform transition-transform group-hover:scale-105">
                 <div className="absolute inset-2 border border-[#94a3b8] opacity-30 rounded-lg"></div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                 <div className="text-4xl text-[#d4af37] opacity-70 animate-pulse">✦</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCard !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative perspective-1000">
            <button onClick={closeCard} className="absolute -top-12 right-0 md:-right-12 text-white/80 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className={`relative w-[320px] h-[480px] duration-1000 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl bg-[#0f172a] border-[3px] border-[#334155] flex items-center justify-center">
                 <div className="text-6xl text-[#ffd700] animate-pulse">✦</div>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-2xl bg-white flex flex-col items-center justify-center p-8 text-center border-[8px] border-[#f1f5f9]">
                 <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6 shadow-md text-white"><Quote className="w-5 h-5 fill-current" /></div>
                 <p className="text-[#1e1e1e] font-serif font-bold text-2xl leading-relaxed break-keep mb-6">"{quotes[selectedCard].text}"</p>
                 <div className="w-10 h-[2px] bg-[#d4af37] mx-auto mb-6"></div>
                 <p className="text-sm text-[#555] font-medium uppercase tracking-widest">{quotes[selectedCard].author}</p>
                 <button onClick={closeCard} className="mt-6 text-xs text-[#888] hover:text-[#333] underline underline-offset-4">닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChooseCard;