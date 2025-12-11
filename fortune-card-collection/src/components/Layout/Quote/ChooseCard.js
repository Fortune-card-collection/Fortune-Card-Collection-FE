import React, {useState, useEffect} from 'react';
import QuoteCard from './QuoteCard';
import { X, Quote,  } from 'lucide-react';

const QUOTES = [
  { text: "가장 큰 위험은 위험 없는 삶이다.", author: "스티븐 코비" },
  { text: "행복은 이미 만들어져 있는 것이 아니다.", author: "달라이 라마" },
  { text: "웃어야 복이 온다.", author: "한국 속담" },
  { text: "가장 큰 위험은 위험 없는 삶이다.", author: "스티븐 코비" },
  { text: "행복은 이미 만들어져 있는 것이 아니다.", author: "달라이 라마" },
  { text: "웃어야 복이 온다.", author: "한국 속담" },
  { text: "가장 큰 위험은 위험 없는 삶이다.", author: "스티븐 코비" },
  { text: "행복은 이미 만들어져 있는 것이 아니다.", author: "달라이 라마" },
  { text: "웃어야 복이 온다.", author: "한국 속담" },
  { text: "가장 큰 위험은 위험 없는 삶이다.", author: "스티븐 코비" },
  { text: "행복은 이미 만들어져 있는 것이 아니다.", author: "달라이 라마" },
  { text: "웃어야 복이 온다.", author: "한국 속담" },
];

// 3. 오늘의 명언 카드 선택
const ChooseCard = () => {

  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quotes] = useState(() => [...QUOTES].sort(() => 0.5 - Math.random()));
  const [showQuoteCard, setShowQuoteCard] = useState(false);

  const [moveWhite, setMoveWhite] = useState("#1a1a2e");
  const [moveWhiteCard, setMoveWhiteCard] = useState("#1e293b");
  const [size, setSize] = useState({ width: 160, height: 250 });
  const [removeSize, setRemoveSize] = useState({ width: 160, height: 250 });
  const [borderWidth, setBorderWidth] = useState(2);
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    if (selectedCard !== null) {
      let opacity = 0;
      let growW = 160;
      let growH = 250;
      let shrinkW = 160;
      let shrinkH = 250;

      const steps = 10;
      const interval = 100;

      const growTarget = { width: 355, height: 500 };
      const shrinkTarget = { width: 0, height: 0 };

      const growStepW = (growTarget.width - growW) / steps;
      const growStepH = (growTarget.height - growH) / steps;

      const shrinkStepW = (shrinkW - shrinkTarget.width) / steps;
      const shrinkStepH = (shrinkH - shrinkTarget.height) / steps;

      let count = 0;

      const startColor = hexToRgb("#1a1a2e");
      const startCardColor = hexToRgb("#1e293b");
      const endColor = hexToRgb("#ffffff");

      let w = 2;

      const anim = setInterval(() => {
        opacity += 1 / steps;
        if (opacity > 1) opacity = 1;

        const inv = 1 - opacity; // 1 → 0

        // 투명도만 조절
        setMoveWhite(`rgba(${startColor.r}, ${startColor.g}, ${startColor.b}, ${inv})`);
        setMoveWhiteCard(`rgba(${startCardColor.r}, ${startCardColor.g}, ${startCardColor.b}, ${inv})`);
        setBgOpacity(1 - opacity);

        console.log(`rgba(${startColor.r}, ${startColor.g}, ${startColor.b}, ${inv})`);

        // 선택된 카드 커짐
        growW += growStepW;
        growH += growStepH;
        setSize({ width: growW, height: growH });

        // 선택 안된 카드 줄어듦
        shrinkW -= shrinkStepW;
        shrinkH -= shrinkStepH;
        setRemoveSize({ width: shrinkW, height: shrinkH });

        w -= 2 / steps;
        if (w < 0) w = 0;
        setBorderWidth(w);

        count++;
        if (count >= steps) {
          clearInterval(anim);
        }
      }, interval);

      return () => clearInterval(anim);
    } else {
      // 초기 상태로 되돌리기
      setMoveWhite('#1a1a2e');
      setSize({ width: 180, height: 270 });
      setBorderWidth(2);
    }
  }, [selectedCard]);

  const lerpColor = (color1, color2, t) => {
    const r = Math.round(color1.r + (color2.r - color1.r) * t);
    const g = Math.round(color1.g + (color2.g - color1.g) * t);
    const b = Math.round(color1.b + (color2.b - color1.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const handleCardClick = (index) => {

    setSelectedCard(index)
    setIsFlipped(true);
    // 1초 뒤 다음 화면으로 전환
    setTimeout(() => setShowQuoteCard(true), 2000);
  };

  const closeCard = () => {
    setIsFlipped(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  if (selectedCard !== null && showQuoteCard) {
      return (
        <QuoteCard 
          quote={quotes[selectedCard]} 
          onClose={() => {
            setSelectedCard(null);
            setShowQuoteCard(false);
            setIsFlipped(false);
          }} 
        />
      );
  }

  return (
    <div className="w-full max-w-4xl mx-auto max-w-[1100px] mx-auto">

      <div 
        className="relative w-full rounded-3xl p-12 overflow-hidden shadow-inner border-[6px] border-white"
        style={{ backgroundColor: moveWhite }}
      >
        <div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"
          style={{ opacity: 0.3 * bgOpacity }}
        ></div>

        {/* 배경 레이어 2 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#ffffff] to-transparent"
          style={{ opacity: 0.05 * bgOpacity }}
        ></div>
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#d4af37] opacity-30 rounded-tl-xl"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#d4af37] opacity-30 rounded-tr-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#d4af37] opacity-30 rounded-bl-xl"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#d4af37] opacity-30 rounded-br-xl"></div>

        <div className="flex justify-center gap-6 md:gap-12 relative z-10">
          <div 
            className="relative w-40 h-64 md:w-48 md:h-72 cursor-pointer group transition-all duration-300 hover:-translate-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={
              selectedCard === 0
                ? {
                    width: size.width,
                    height: size.height,
                    transform: `translate(50px, 14px)`,
                  }
                : {
                  width: removeSize.width,
                  height: removeSize.height
                }
            }
            onClick={() => handleCardClick(0)}
          >
            <div 
              className="w-full h-full bg-[#1e293b] rounded-xl shadow-2xl border-[#475569] overflow-hidden flex items-center justify-center relative transform transition-transform group-hover:scale-105"
              style={
                selectedCard === 0
                  ? {}
                  : {
                    backgroundColor: moveWhiteCard,
                    borderWidth: borderWidth,
                  }
              }
            >
              <div className="absolute inset-2 border border-[#94a3b8] opacity-30 rounded-lg"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="text-4xl text-[#d4af37] opacity-70 animate-pulse">✦</div>
            </div>
          </div>

          <div 
            className="relative w-40 h-64 md:w-48 md:h-72 cursor-pointer group transition-all duration-300 hover:-translate-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={
              selectedCard === 1
                ? {
                    width: size.width,
                    height: size.height,
                  }
                : {
                  width: removeSize.width,
                  height: removeSize.height
                }
            }
            onClick={() => handleCardClick(1)}
          >
            <div 
              className="w-full h-full rounded-xl shadow-2xl bg-[#1e293b] border-[#475569] overflow-hidden flex items-center justify-center relative transform transition-transform group-hover:scale-105"
              style={
                selectedCard === 1
                  ? {}
                  : {
                    backgroundColor: moveWhiteCard,
                    borderWidth: borderWidth,
                  }
              }
            >
              <div className="absolute inset-2 border border-[#94a3b8] opacity-30 rounded-lg"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="text-4xl text-[#d4af37] opacity-70 animate-pulse">✦</div>
            </div>
          </div>

          <div 
            className="relative md:w-48 md:h-72 cursor-pointer group transition-all duration-300 hover:-translate-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={
              selectedCard === 2
                ? {
                    width: size.width,
                    height: size.height,
                    transform: `translate(-50px, 13px)`,
                  }
                : {
                  width: removeSize.width,
                  height: removeSize.height
                }
            }
            onClick={() => handleCardClick(2)}
          >
            <div 
              className="w-full h-full rounded-xl shadow-2xl bg-[#1e293b] border-[#475569] overflow-hidden flex items-center justify-center relative transform transition-transform group-hover:scale-105"
              style={
                selectedCard === 2
                  ? {}
                  : {
                    backgroundColor: moveWhiteCard,
                    borderWidth: borderWidth,
                  }
              }
            >
              <div className="absolute inset-2 border border-[#94a3b8] opacity-30 rounded-lg"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="text-4xl text-[#d4af37] opacity-70 animate-pulse">✦</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChooseCard;