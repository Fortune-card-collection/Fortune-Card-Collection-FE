import React, {useState} from "react";

export default function StarSelectHeader({ zodiacs, selectedZodiac, onSelect }) {
  return (
    <header className="flex flex-wrap justify-center gap-3 py-4 px-3 border-b border-gray-200 backdrop-blur-md ">
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
    </header>

  );
}
