// import React from "react";

// export default function ChooseStar() {
//   return (
//     <div
//       style={{
//         minHeight: "95vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: "28px",
//         fontFamily: "system-ui",
//       }}
//     >
//       Start
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Search, Menu, Star, MessageCircle, Info, X, ChevronRight, Share2, RefreshCw, Calendar, Clock, Check } from 'lucide-react';

/**
 * [최종 디자인 시안] 포털(Daum) 스타일 통합 운세 페이지
 * * [디자이너/개발자 참고사항]
 * 1. 이 코드는 레이아웃과 인터랙션이 구현된 상태입니다.
 * 2. 'ZODIACS' 배열의 'image' 필드에 실제 디자인 파일(PNG/JPG) 경로를 넣으세요.
 * 3. 현재는 이미지가 없을 경우를 대비해 CSS 그라디언트로 예시가 적용되어 있습니다.
 */

// 1. 별자리 카드 모달 (여기에 디자인한 카드가 뜹니다)
// const ChooseStar = ({ zodiac, onClose }) => {
//   if (!zodiac) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
//       <div className="relative w-full max-w-md bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl text-white transform transition-all scale-100">
        
//         {/* 닫기 버튼 */}
//         <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors text-white">
//           <X className="w-6 h-6 shadow-sm" />
//         </button>

//         {/* 카드 디자인 영역 */}
//         <div className="relative aspect-[4/5] flex flex-col items-center justify-center text-center">
           
//            {/* [개발자용] 이미지가 있으면 이미지를 보여주고, 없으면 기본 CSS 디자인을 보여줌 */}
//            {zodiac.image ? (
//              <img src={zodiac.image} alt={zodiac.name} className="absolute inset-0 w-full h-full object-cover" />
//            ) : (
//              <>
//                {/* 기본 디자인 (이미지 없을 때) */}
//                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95]"></div>
//                <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
               
//                <div className="relative z-10 p-8">
//                   <div className="text-sm font-medium text-blue-200 mb-2 tracking-widest uppercase">Daily Horoscope</div>
//                   <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-blue-400/30 bg-white/5 flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
//                     {zodiac.icon}
//                   </div>
//                   <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
//                     {zodiac.name}
//                   </h2>
//                   <p className="text-blue-300 text-sm mb-8">{zodiac.date}</p>

//                   <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg text-left">
//                     <h3 className="text-xl font-bold mb-3">"뜻밖의 행운이 찾아옵니다"</h3>
//                     <p className="text-sm text-gray-200 leading-relaxed font-light">
//                       오랫동안 기다려왔던 소식이 들려올 수 있습니다. <br/>
//                       주변 사람들과의 대화 속에서 중요한 힌트를 얻을 수 있으니 귀를 기울이세요.
//                     </p>
//                   </div>
//                </div>
//              </>
//            )}

//            {/* 공유하기 버튼 (카드 위에 뜸) */}
//            <div className="absolute bottom-8 left-0 w-full flex justify-center z-20">
//              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-900 font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg">
//                <Share2 className="w-4 h-4" /> 카드 공유하기
//              </button>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// [FINAL UPGRADE] 배경까지 완벽한 우주 테마 별자리 휠
const ZODIACS = [
  { id: 'aquarius', name: '물병자리', date: '01.20~02.18', icon: '♒', luck: 90, image: null }, // image: '/assets/aquarius_card.png'
  { id: 'pisces', name: '물고기자리', date: '02.19~03.20', icon: '♓', luck: 75, image: null },
  { id: 'aries', name: '양자리', date: '03.21~04.19', icon: '♈', luck: 85, image: null },
  { id: 'taurus', name: '황소자리', date: '04.20~05.20', icon: '♉', luck: 60, image: null },
  { id: 'gemini', name: '쌍둥이자리', date: '05.21~06.21', icon: '♊', luck: 95, image: null },
  { id: 'cancer', name: '게자리', date: '06.22~07.22', icon: '♋', luck: 50, image: null },
  { id: 'leo', name: '사자자리', date: '07.23~08.22', icon: '♌', luck: 80, image: null },
  { id: 'virgo', name: '처녀자리', date: '08.23~09.23', icon: '♍', luck: 70, image: null },
  { id: 'libra', name: '천칭자리', date: '09.24~10.22', icon: '♎', luck: 88, image: null },
  { id: 'scorpio', name: '전갈자리', date: '10.23~11.22', icon: '♏', luck: 92, image: null },
  { id: 'sagittarius', name: '사수자리', date: '11.23~12.24', icon: '♐', luck: 65, image: null },
  { id: 'capricorn', name: '염소자리', date: '12.25~01.19', icon: '♑', luck: 78, image: null },
];

const ChooseStar = ({ onSelect }) => {
  const [hoveredZodiac, setHoveredZodiac] = useState(null);
  const radius = 220; 
  const containerSize = 600; // 배경을 위해 사이즈 약간 확대

  return (
    <div className={`relative w-[${containerSize}px] h-[${containerSize}px] mx-auto my-6 flex items-center justify-center select-none animate-in fade-in duration-1000`}>
      
      {/* 0. [NEW] 휠 전체 배경 (Deep Space Circle) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         {/* 메인 우주 배경 원 */}
         <div className="w-[580px] h-[580px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617] shadow-2xl overflow-hidden relative border border-[#1e293b]">
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
             <div className="text-6xl text-[#ffd700] mb-2 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">{hoveredZodiac.icon}</div>
             <div className="font-serif font-bold text-white text-3xl mb-1 tracking-wide drop-shadow-md">{hoveredZodiac.name}</div>
             <div className="text-sm text-blue-200 font-medium tracking-widest uppercase">{hoveredZodiac.date}</div>
             <div className="mt-4 px-5 py-1.5 bg-white/10 backdrop-blur-md border border-white/30 text-[#d4af37] text-xs font-bold rounded-full shadow-lg tracking-wider">
               CLICK
             </div>
           </div>
         ) : (
           <div className="relative z-10 flex flex-col items-center text-blue-200/40">
             <Star className="w-10 h-10 mb-3 fill-white/10 text-white/20 animate-pulse" />
             <div className="text-lg text-blue-100/60 font-serif font-medium leading-tight tracking-wide">
               ZODIAC<br/>SIGN
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
            onClick={() => onSelect(zodiac)}
            onMouseEnter={() => setHoveredZodiac(zodiac)}
            onMouseLeave={() => setHoveredZodiac(null)}
            className="absolute w-[72px] h-[72px] rounded-full 
                       bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg 
                       flex items-center justify-center text-3xl text-blue-100
                       hover:scale-125 hover:bg-[#d4af37] hover:text-[#0f172a] hover:border-transparent hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]
                       transition-all duration-300 group z-20"
            style={{ 
              left: `calc(50% + ${radius * Math.cos(angle)}px - 36px)`, 
              top: `calc(50% + ${radius * Math.sin(angle)}px - 36px)`
            }}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">{zodiac.icon}</span>
            {/* 궤도 연결선 (Hover 시) */}
            <div className="absolute top-1/2 left-1/2 w-[220px] h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{ transform: `rotate(${angle + 90 + 180}rad) translate(-50%, -50%)` }}></div>
          </button>
        );
      })}
    </div>
  );
};
export default ChooseStar;
