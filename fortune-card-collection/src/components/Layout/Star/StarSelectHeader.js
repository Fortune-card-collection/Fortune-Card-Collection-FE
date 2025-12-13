import React, {useState} from "react";

export default function StarSelectHeader({ zodiacs, selectedZodiac, onSelect, selectedPeriod, onSelectPeriod}) {
    const periods = ["오늘", "내일", "이달", "올해"];

    return (
        <header className="flex flex-wrap justify-center border-b border-gray-200 backdrop-blur-md ">
            <div className="flex flex-wrap justify-center gap-3 py-4 px-[50px]">
                {zodiacs.map(zodiac => (
                    <button
                        key={zodiac.id}
                        onClick={() => onSelect(zodiac)}
                        className={`px-4 py-2 text-lg rounded-full font-semibold transition-colors duration-200 ${
                            selectedZodiac.id === zodiac.id
                            ? "bg-yellow-400 text-black font-bold shadow-md"
                            : "bg-white text-gray-500"
                        }`}
                    >
                        {zodiac.name}
                    </button>
                ))}
            </div>

            <div className="w-full border-b border-gray-200" />
            <div className="flex justify-center items-center mt-4 border-b border-gray-200 ">
                {periods.map(period => (
                    <button
                        key={period}
                        onClick={() => onSelectPeriod(period)}
                        className={`text-xl font-semibold transition-colors duration-200 pb-2 w-[90px] ${
                            selectedPeriod === period
                            ? "font-extrabold text-yellow-400 border-b-2 border-yellow-400"
                            : "text-gray-500"
                        }`}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </header>

    );
}
