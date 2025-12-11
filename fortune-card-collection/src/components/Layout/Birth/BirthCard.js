import React from "react";
import whiteCircle from "../../../assets/images/whiteCircle.svg";


export default function BirthCard({ cardimg, onBack, Birth }) {

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-9">
            <div className="flex justify-center items-center">
                <div className="relative w-[368.1px] h-[500px] flex justify-center items-center">
                    <img
                        src={cardimg}
                        alt="별 카드 이미지"
                        className="absolute inset-0 w-full h-full object-cover shadow-lg rounded-xl"
                    />
                </div>

                <div className="absolute flex justify-center items-center">
                    {/* 블랙 원 이미지 */}
                    <img
                        src={whiteCircle}
                        alt="원형 배경"
                        className="w-[370.15px] h-[500px] object-cover"
                    />
                    {/* 텍스트 */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                        <h2 className="text-black text-2xl font-bold mb-3 drop-shadow-md">
                            {Birth.slice(0,4)}.{Birth.slice(4,6)}.{Birth.slice(6,8)} 운세
                        </h2>
                        <p className="text-black== text-base drop-shadow-md px-5">
                            오늘의 운세는 좋을 것으로 예상됩니다. 그러므로 기초웹 과제
                        </p>
                    </div>
                    <button
                        className="absolute bottom-[33px] w-[120px] h-[40px] border border-gray-600 text-gray-600 rounded-lg hover:text-black hover:border-black"
                    >
                        공유하기
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button
                    onClick={onBack}
                    className="px-[90px] py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm mt-3"
                >
                    다시 입력하기
                </button>
            </div>
        </div>
    );
}
