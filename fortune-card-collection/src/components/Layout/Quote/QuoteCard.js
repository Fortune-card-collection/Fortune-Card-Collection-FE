import React from "react";
import Quote from "../../../assets/images/명언카드.svg";

export default function QuoteCard({ }) {

    
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-9">
            <div className="flex justify-center items-center">
                <div className="relative w-[355px] h-[500px] flex justify-center items-center">
                    <img
                        src={Quote}
                        alt="명언 카드 이미지"
                        className="absolute inset-0 w-full h-full object-cover shadow-lg rounded-xl"
                    />
                    {/* 텍스트 */}
                    <div className="absolute inset-0 flex flex-col top-40 items-center text-center ">
                        <p className="text-black text-2xl font-bold drop-shadow-md px-[53px]">
                            웃어야 복이온다.. [정준영] 오늘의 명언
                        </p>
                    </div>
                    <button
                        className="absolute bottom-[33px] w-[120px] h-[40px] border border-gray-600 text-gray-600 rounded-lg hover:text-black hover:border-black"
                    >
                        공유하기
                    </button>
                </div>

            </div>
        </div>
    );
}
