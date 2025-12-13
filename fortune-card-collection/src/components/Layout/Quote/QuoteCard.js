import React, {useState} from "react";
import axios from "axios";
import Quote from "../../../assets/images/명언카드.svg";

const domain = process.env.REACT_APP_BACKEND_DOMAIN_KEY;

export default function QuoteCard({quote}) {
    const [isFlipped, setIsFlipped] = useState(true);
    const [message, setMessage] = useState("");

    const ShowQuote = async () => {
        try {
            const response = await axios.get(`${domain}/quotes/${quote}`,{withCredentials: true});
            console.log(response.text);
            setMessage(response.text);

        } catch(error) {
            if (error.response) {
                // ❌ 서버 에러 응답
                console.error(`❗ 오류 (${error.response.status}):`, error.response.data);
            } else if (error.request) {
                // ❗ 네트워크 에러
                console.error('🌐 서버 응답 없음:', error.message);
            } else {
                // ❗ 기타 에러
                console.error('⚠️ 요청 실패:', error.message);
            }
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-9">
            <div className="flex justify-center items-center">
                <div 
                    className="relative w-[355px] h-[543px] mt-[18px]" 
                    onClick={() => setIsFlipped(prev => !prev)}
                    style={{ perspective: "1000px" }}
                >
                    <div
                        style={{
                            width: "355px",
                            height: "500px",
                            transition: "transform 0.7s",
                            transformStyle: "preserve-3d",
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            position: "relative"
                        }}
                    >
                        {/* 앞면 */}
                        <div 
                            className="shadow-2xl rounded-xl flex items-center justify-center relative transform transition-transform"
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                backgroundColor: "#1e293b",
                            }}
                        >
                            <div className="absolute inset-2 border border-[#94a3b8] opacity-30 rounded-lg"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                            <div className="text-4xl text-[#d4af37] opacity-1 animate-pulse">✦</div>
                        </div>

                        {/* 뒷면 */}
                        <div 
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden"
                            }}
                            className="shadow-2xl"
                        >
                            <img
                                src={Quote}
                                alt="명언 카드 이미지"
                                className="w-full h-full object-cover shadow-lg rounded-xl"
                            />
                            <div className="absolute inset-0 flex flex-col top-40 items-center text-center">
                                <p className="text-black text-2xl font-bold drop-shadow-md px-[53px]">
                                    {message}
                                </p>
                            </div>
                            <button className="absolute bottom-[45px] left-[120px] w-[120px] h-[40px] border border-white text-white rounded-lg hover:text-black hover:border-black">
                                공유하기
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
