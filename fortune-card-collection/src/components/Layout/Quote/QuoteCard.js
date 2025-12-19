import React, { useState, useEffect } from "react";
import axios from "axios";
import Quote from "../../../assets/images/명언카드.svg";

const backendURL = process.env.REACT_APP_BACKEND_DOMAIN_KEY;

export default function QuoteCard({ quote }) {
  const [isFlipped, setIsFlipped] = useState(true);
  const [message, setMessage] = useState("");

  const ShowQuote = async () => {
    try {
      const response = await axios.get(`${backendURL}/quotes/${quote}`);
      // console.log(response.data.text);
      setMessage(response.data.text);
    } catch (error) {
      if (error.response) {
        // ❌ 서버 에러 응답
        console.error(
          `❗ 오류 (${error.response.status}):`,
          error.response.data
        );
      } else if (error.request) {
        // ❗ 네트워크 에러
        console.error("🌐 서버 응답 없음:", error.message);
      } else {
        // ❗ 기타 에러
        console.error("⚠️ 요청 실패:", error.message);
      }
    }
  };

  useEffect(() => {
    // console.log("명언 카드 실행됨",quote);
    ShowQuote();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-9">
      <div className="flex justify-center items-center">
        <div
          className="relative w-[355px] h-[543px] mt-[18px]"
          onClick={() => setIsFlipped((prev) => !prev)}
          style={{ perspective: "1000px" }}
        >
          <div
            style={{
              width: "355px",
              height: "500px",
              transition: "transform 0.7s",
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              position: "relative",
            }}
          >
            {/* 앞면 */}
            <div
              className="shadow-shadow5 rounded-xl flex items-center justify-center relative transform transition-transform"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                backgroundColor: "#1e293b",
              }}
            >
              <div className="absolute inset-2 border border-quote-line opacity-30 rounded-lg"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="text-4xl text-primary-highlight opacity-1 animate-pulse">
                ✦
              </div>
            </div>

            {/* 뒷면 */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
              }}
              className="shadow-shadow5"
            >
              <img
                src={Quote}
                alt="명언 카드 이미지"
                className="w-full h-full object-cover shadow-shadow3 rounded-xl"
              />
              <div className="absolute inset-0 flex flex-col top-[180px] items-center text-center">
                <p className="text-black text-2xl font-bold drop-shadow-shadow2 px-[60px]">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
