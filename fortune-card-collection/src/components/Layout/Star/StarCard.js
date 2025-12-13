import React, {useEffect, useState} from "react";
import axios from "axios";
import StarSelectHeader from "./StarSelectHeader";
import StarCard1 from "../../../assets/images/물고기자리카드.svg";
import StarCard2 from "../../../assets/images/물고기자리카드.svg";
import StarCard3 from "../../../assets/images/양자리카드.svg";
import StarCard4 from "../../../assets/images/황소자리카드.svg";
import StarCard5 from "../../../assets/images/쌍둥이자리카드.svg";
import StarCard6 from "../../../assets/images/게자리카드.svg";
import StarCard7 from "../../../assets/images/사자자리카드.svg";
import StarCard8 from "../../../assets/images/처녀자리카드.svg";
import StarCard9 from "../../../assets/images/천칭자리카드.svg";
import StarCard10 from "../../../assets/images/전갈자리카드.svg";
import StarCard11 from "../../../assets/images/사수자리카드.svg";
import StarCard12 from "../../../assets/images/염소자리카드.svg";
import blackCircle from "../../../assets/images/blackCircle.svg";

const ZODIACS = [
  { id: 'aquarius', name: '물병자리', image: StarCard1 },
  { id: 'pisces', name: '물고기자리', image: StarCard2 },
  { id: 'aries', name: '양자리', image: StarCard3 },
  { id: 'taurus', name: '황소자리', image: StarCard4 },
  { id: 'gemini', name: '쌍둥이자리', image: StarCard5 },
  { id: 'cancer', name: '게자리', image: StarCard6 },
  { id: 'leo', name: '사자자리', image: StarCard7 },
  { id: 'virgo', name: '처녀자리', image: StarCard8 },
  { id: 'libra', name: '천칭자리', image: StarCard9 },
  { id: 'scorpio', name: '전갈자리', image: StarCard10 },
  { id: 'sagittarius', name: '사수자리', image: StarCard11 },
  { id: 'capricorn', name: '염소자리', image: StarCard12 },
];

const domain = process.env.REACT_APP_BACKEND_DOMAIN_KEY;

const getFormattedDate = (period) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  if (period === "오늘") return `${year}년 ${month}월 ${date}일`;

  if (period === "내일") {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = tomorrow.getMonth() + 1;
    const d = tomorrow.getDate();

    return `${y}년 ${m}월 ${d}일`;
  }

  if (period === "이달") return `${year}년 ${month}월`;

  if (period === "올해") return `${year}년`;

  return "";
};


export default function StarCard({ selectedZodiac, onSelect }) {
    const [selectedPeriod, setSelectedPeriod] = useState("오늘");
    const [message, setMessage] = useState("");

    const index = ZODIACS.findIndex(z => z.name === selectedZodiac.name);
    const image = ZODIACS[index].image;

    const StarChoose = async () => {
        const korenPeriod = (period) => {
            if(period === "오늘") return "today";
            if(period === "내일") return "tomorrow";
            if(period === "이달") return "month";
            if(period === "올해") return "year";
            else return "today";
        }
        if (!selectedZodiac) return;
        const zodiac = ZODIACS.find(z => z.name === selectedZodiac.name);

        try {
            console.log("쿠키:",document.cookie);
            const response = await axios.get(`${domain}/horoscopes/${zodiac.id}/${korenPeriod(selectedPeriod)}`);
            const responseMessage = response.data.message;
            setMessage(responseMessage);
            console.log("input:",responseMessage);
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
    };

    useEffect(() => {
        StarChoose();
    }, [selectedZodiac, selectedPeriod])

    return (
        <div className="flex flex-wrap justify-center items-center">
            <div className="bg-white max-w-[1100px] mx-auto shadow-sm" >
                {/* StarSelectHeader */}
                <StarSelectHeader
                    zodiacs={ZODIACS}
                    selectedZodiac={selectedZodiac}
                    onSelect={(zodiac) => onSelect(zodiac)}
                    selectedPeriod={selectedPeriod}
                    onSelectPeriod={setSelectedPeriod}
                />
            </div>

            {/* 중앙 카드 */}
            <div className="flex w-full justify-center items-center py-7">
                <div className="relative  w-[310px] h-[500px] flex justify-center items-center">
                    {/* 배경 이미지 */}
                    <img
                        src={ZODIACS[index].image}
                        alt="별 카드 이미지"
                        className="absolute inset-0 w-full h-full object-cover rounded-[49px] shadow-xl object-cover"
                    />
                    
                    {/* 블랙서클 + 텍스트 */}
                    <div className="absolute flex justify-center items-center">
                        {/* 블랙 원 이미지 */}
                        <img
                            src={blackCircle}
                            alt="원형 배경"
                            className="w-[257px] h-[412px] object-cover"
                        />
                        {/* 텍스트 */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                            <h2 className="text-white text-2xl font-bold mb-3 drop-shadow-md">
                                {getFormattedDate(selectedPeriod)}
                            </h2>
                            <p className="text-white whitespace-pre-line h-[290px] overflow-auto text-base scrollbar-hide text-left drop-shadow-md">
                                {message}
                            </p>
                        </div>

                        <button
                            className="absolute bottom-[-5px] w-[120px] h-[40px] border border-white text-white rounded-lg hover:text-yellow-400 hover:border-yellow-400"
                        >
                            공유하기
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
