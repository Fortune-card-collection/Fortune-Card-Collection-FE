import React from 'react';
import { X, Share2,  } from 'lucide-react';

// [유지] 별자리 카드 결과 모달
const ZodiacModal = ({ zodiac, onClose }) => {
  if (!zodiac) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl text-white border border-[#1e293b]">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="relative aspect-[4/5] flex flex-col items-center justify-center text-center p-8">
           <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]"></div>
           <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(rgba(212,175,55,0.3) 1px, transparent 1px)', backgroundSize: '25px 25px'}}></div>
           <div className="relative z-10">
              <div className="text-xs font-bold text-[#d4af37] mb-2 tracking-[0.2em] uppercase">Premium Horoscope</div>
              <div className="w-24 h-24 mx-auto mb-6 rounded-full border border-[#d4af37]/30 bg-white/5 flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                {zodiac.icon}
              </div>
              <h2 className="text-3xl font-serif font-bold mb-2 text-white drop-shadow-md">{zodiac.name}</h2>
              <p className="text-blue-200/70 text-sm mb-8 font-light tracking-wide">{zodiac.date}</p>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-[#d4af37]/20 shadow-lg text-left">
                <h3 className="text-xl font-bold mb-3 text-[#fceabb]">"귀인이 찾아오는 하루"</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  당신의 별이 가장 밝게 빛나는 시기입니다. 중요한 결정을 내리기에 아주 좋은 날이며, 
                  특히 오후 2시경 행운의 기운이 가장 강합니다.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-[#d4af37]">
                   <span>★ 재물운: 95점</span>
                   <span>♥ 연애운: 80점</span>
                </div>
              </div>
           </div>
           <div className="absolute bottom-8 left-0 w-full flex justify-center z-20">
             <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#d4af37] text-[#0f172a] font-bold text-sm hover:bg-[#c5a028] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]">
               <Share2 className="w-4 h-4" /> 운세 공유하기
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
export default ZodiacModal;