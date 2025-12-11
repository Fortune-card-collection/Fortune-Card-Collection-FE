import React, { useState, useEffect } from 'react';
import { Search, Menu, Star, MessageCircle, Info, X, ChevronRight, Share2, RefreshCw, Calendar, Clock, Check } from 'lucide-react';
import StarCard from './StarCard';
import Star1 from "../../../assets/images/물병자리.svg";
import Star2 from "../../../assets/images/물고기자리.svg";
import Star3 from "../../../assets/images/양자리.svg";
import Star4 from "../../../assets/images/황소자리.svg";
import Star5 from "../../../assets/images/쌍둥이자리.svg";
import Star6 from "../../../assets/images/게자리.svg";
import Star7 from "../../../assets/images/사자자리.svg";
import Star8 from "../../../assets/images/처녀자리.svg";
import Star9 from "../../../assets/images/천칭자리.svg";
import Star10 from "../../../assets/images/전갈자리.svg";
import Star11 from "../../../assets/images/사수자리.svg";
import Star12 from "../../../assets/images/염소자리.svg";

const ZODIACS = [
  { id: 'aquarius', name: '물병자리', date: '01.20~02.18', icon: '♒', luck: 90, image: Star1 }, // image: '/assets/aquarius_card.png'
  { id: 'pisces', name: '물고기자리', date: '02.19~03.20', icon: '♓', luck: 75, image: Star2 },
  { id: 'aries', name: '양자리', date: '03.21~04.19', icon: '♈', luck: 85, image: Star3 },
  { id: 'taurus', name: '황소자리', date: '04.20~05.20', icon: '♉', luck: 60, image: Star4 },
  { id: 'gemini', name: '쌍둥이자리', date: '05.21~06.21', icon: '♊', luck: 95, image: Star5 },
  { id: 'cancer', name: '게자리', date: '06.22~07.22', icon: '♋', luck: 50, image: Star6 },
  { id: 'leo', name: '사자자리', date: '07.23~08.22', icon: '♌', luck: 80, image: Star7 },
  { id: 'virgo', name: '처녀자리', date: '08.23~09.23', icon: '♍', luck: 70, image: Star8 },
  { id: 'libra', name: '천칭자리', date: '09.24~10.22', icon: '♎', luck: 88, image: Star9 },
  { id: 'scorpio', name: '전갈자리', date: '10.23~11.22', icon: '♏', luck: 92, image: Star10 },
  { id: 'sagittarius', name: '사수자리', date: '11.23~12.24', icon: '♐', luck: 65, image: Star11 },
  { id: 'capricorn', name: '염소자리', date: '12.25~01.19', icon: '♑', luck: 78, image: Star12 },
];

const ChooseStar = () => {
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [hoveredZodiac, setHoveredZodiac] = useState(null);
  const radius = 220; 
  const containerSize = 600; // 배경을 위해 사이즈 약간 확대

  const onSelectStar = (zodiac) => {
    setSelectedZodiac(zodiac); // 선택 상태 변경
  };

  if (selectedZodiac) {
    return (
      <StarCard 
        selectedZodiac={selectedZodiac}
        onBack={() => setSelectedZodiac(null)} 
        onSelect={onSelectStar}
      />
    );
  }

  return (
    <div className={`relative w-[${containerSize}px] h-[${containerSize}px] mx-auto my-6 flex items-center justify-center select-none animate-in fade-in duration-1000`}>
      
      {/* 0. [NEW] 휠 전체 배경 (Deep Space Circle) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         {/* 메인 우주 배경 원 */}
         <div className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617] shadow-2xl overflow-hidden relative border border-[#1e293b]">
            {/* 별 패턴 텍스처 */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            {/* 은은한 네뷸라 효과 */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10"></div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-blue-600/5 blur-3xl rounded-full"></div>
         </div>
      </div>

      {/* 1. 장식 궤도 라인 (Gold & Light Blue) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[480px] h-[480px] rounded-full border border-[#d4af37] opacity-20"></div>
        <div className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-[#60a5fa] opacity-20"></div>
        {/* 나침반 십자선 */}
        <div className="absolute w-[540px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-10"></div>
        <div className="absolute w-[1px] h-[540px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-10"></div>
      </div>

      {/* 2. 중앙 정보 허브 (Cosmic Window) */}
      <div className="absolute z-10 w-64 h-64 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center border-[2px] border-[#d4af37]/50 transition-all duration-300 overflow-hidden group bg-black">
         {/* 중앙 내부 배경 */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e3a8a] to-[#000]"></div>
         <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>

         {hoveredZodiac ? (
           <div className="relative z-10 animate-in zoom-in duration-300 flex flex-col items-center text-white">
            <img
              src={hoveredZodiac.image}
              alt={hoveredZodiac.name}
              className="w-[130px] h-[130px] mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
            />
             <div className="font-serif font-bold text-white text-3xl mb-1 tracking-wide drop-shadow-md -translate-y-[13px]">{hoveredZodiac.name}</div>
             <div className="text-sm text-blue-200 font-medium tracking-widest uppercase -translate-y-[13px]">{hoveredZodiac.date}</div>
             {/* <div className="mt-4 px-5 py-1.5 bg-white/10 backdrop-blur-md border border-white/30 text-[#d4af37] text-xs font-bold rounded-full shadow-lg tracking-wider -translate-y-[8px]">
               CLICK
             </div> */}
           </div>
         ) : (
           <div className="relative z-10 flex flex-col items-center text-blue-200/40">
             <Star className="w-10 h-10 mb-3 fill-white/10 text-white/20 animate-pulse" />
             <div className="text-lg text-blue-100/60 font-serif font-medium leading-tight tracking-wide">
               별자리를<br/>선택해 주세요
             </div>
           </div>
         )}
      </div>

      {/* 3. 별자리 아이콘 버튼 (Glass Style on Space) */}
      {ZODIACS.map((zodiac, index) => {
        const angle = (index * 30 - 90) * (Math.PI / 180);
        return (
          <button
            key={zodiac.id}
            onClick={() => onSelectStar(zodiac)}
            onMouseEnter={() => setHoveredZodiac(zodiac)}
            onMouseLeave={() => setHoveredZodiac(null)}
            className="absolute w-[110px] h-[110px] rounded-full
                       flex items-center justify-center text-3xl text-blue-100
                       hover:scale-125 hover:bg-[#d4af37] hover:text-[#0f172a] hover:border-transparent hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]
                       transition-all duration-300 group z-20"
            style={{ 
              left: `calc(50% + ${radius * Math.cos(angle)}px - 55px + ${index === 11 ? -10 : 0}px)`, 
              top: `calc(50% + ${radius * Math.sin(angle)}px - 55px)`
            }}
          >
             {/* bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg  */}
            {/* <span className="transition-transform duration-300 group-hover:scale-110">{zodiac.icon}</span> */}
            <span className="flex flex-col items-center ">
              <img
                src={zodiac.image}
                alt={zodiac.name}
                className={`w-[110px] h-[110px] transition-transform duration-300 translate-y-[5px] ${selectedZodiac?.id === zodiac.id ? "scale-[1.01]" : "scale-100"}`}
              />
            
              <span className="font-serif font-semibold text-sm text-white mt-2 -translate-y-[21px] group-hover:scale-[1.05]">
                {zodiac.name}
              </span>
            </span>
            {/* 궤도 연결선 (Hover 시) */}
            <div className="absolute top-1/2 left-1/2 w-[146px] h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                 style={{ transform: `rotate(${angle}rad) translate(-50%, -50%)` }}></div>
          </button>
        );
      })}
    </div>
  );
};
export default ChooseStar;
