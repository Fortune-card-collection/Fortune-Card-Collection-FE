import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import { Search, Menu, Star, MessageCircle, Info, X, ChevronRight, Share2, RefreshCw, Calendar, Clock, Check } from 'lucide-react';
import spring from "../../../assets/images/봄카드.svg";
import summer from "../../../assets/images/여름카드.svg";
import autumn from "../../../assets/images/가을카드.svg";
import winter from "../../../assets/images/겨울카드.svg";
import BirthCard from "./BirthCard";

const TIME_OPTIONS = [
  "시간 모름",
  "자시 (23:30 ~ 01:29)",
  "축시 (01:30 ~ 03:29)",
  "인시 (03:30 ~ 05:29)",
  "묘시 (05:30 ~ 07:29)",
  "진시 (07:30 ~ 09:29)",
  "사시 (09:30 ~ 11:29)",
  "오시 (11:30 ~ 13:29)",
  "미시 (13:30 ~ 15:29)",
  "신시 (15:30 ~ 17:29)",
  "유시 (17:30 ~ 19:29)",
  "술시 (19:30 ~ 21:29)",
  "해시 (21:30 ~ 23:29)",
];

const domain = process.env.REACT_APP_BACKEND_DOMAIN_KEY;

//생년월일 입력 폼
const Input = () => {
  const wrapperRef = useRef(null);
  const [step, setStep] = useState('input');
  const [birth, setBirth] = useState("");
  const [time, setTime] = useState("시간 모름");

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const nowYear = new Date().getFullYear();
  const years = Array.from({ length: nowYear - 1930 + 2 }, (_, i) => 1930 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [solar, setSolar] = useState(true);
  const [lunar, setLunar] = useState(false);

  const [woman, setWoman] = useState(true);
  const [man, setMan] = useState(false);

  const [cardimg, setCardImg] = useState();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTime(e.target.value); // 선택된 값 저장
  };

  useEffect(() => {
    userData();
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false); // 바깥 클릭 시 닫기
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function season(a) {
    if (a.length < 6) {
      setError("생년월일을 입력해주세요");
      return false;
    }

    const selectMonth = parseInt(a.slice(4, 6));
    if (selectMonth < 1 || selectMonth > 12 || parseInt(a.slice(0, 4)) > nowYear || parseInt(a.slice(6, 8) > 31)) {
      setError("생년월일을 올바르게 입력해주세요");
      return false;
    }

    if(selectMonth >= 3 && selectMonth <=5 ) {
      setError(null);
      setCardImg(spring);
    } else if(selectMonth <= 8) {
      setError(null);
      setCardImg(summer);
    } else if(selectMonth <= 11) {
      setError(null);
      setCardImg(autumn);
    } else if(selectMonth === 12 || selectMonth === 1 || selectMonth === 2) {
      setError(null);
      setCardImg(winter);
    } else {
      setError("생년월일을 올바르게 입력해주세요!");
      return false;
    }
    return true;
  }

  const userData = async () => {
    try {
      const response = await axios.get(`${domain}/users/me`,{withCredentials: true});
      console.log(response);

      if(response.birthDate !== null) setBirth(response.birthDate);
      if(response.birthTime !== null) {
        if (response.birthTime) {
          const index = TIME_OPTIONS.findIndex(option =>
            option.startsWith(response.birthTime)
          );
          if (index !== -1) {
            setTime(TIME_OPTIONS[index]);
          }
        }
      }
      if(response.lunarType !== null) {
        if(response.lunarType === "solar") {
          setSolar(true);
          setLunar(false);
        } else if(response.lunarType === "lunar") {
          setSolar(false);
          setLunar(true);
        }
      }
      if(response.gender !== null) {
        if(response.gender === "남성") {
          setMan(true);
          setWoman(false);
        } else if(response.gender === "여성") {
          setMan(false);
          setWoman(true);
        }
      }
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

  if (step === 'result') {
    return (
      <BirthCard
        cardimg={cardimg}
        onBack={() => setStep('input')}
        Birth={birth}
        Man={[man,woman]}
        Solar={[solar,lunar]}
        Time={time}
      />
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto py-4 px-4">
      <div className="w-full mx-auto space-y-6">
        <div className="w-full max-w-[600px] min-w-[300px]">
          <label className="block text-sm font-bold text-[#333] mb-2">생년월일</label>
          <div className="relative mb-[-10px]">
            <input 
              type="text"
              placeholder="예: 20010101"
              className="w-full h-12 pl-4 border text-[#333] border-[#ddd] rounded focus:border-[#3da8f5] focus:outline-none"
              value={birth}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                setBirth(onlyNums.slice(0, 8));
              }}
            />
            <Calendar 
              className="absolute right-4 top-3.5 w-5 h-5 text-[#999]"
              onClick={() => setOpen(!open)}
            />
            {error ? (
              <p className="text-red-500 text-sm mt-[2px] h-4">{error}</p>
            ) : (
              <p className="text-sm mt-1 h-4">&nbsp;</p>
            )}
          </div>
        </div>

        {/* 드롭다운 */}
        {open && (
          <div className="relative" ref={wrapperRef}>
            <div className="absolute left-[0px] top-[-15px] bg-white shadow-lg rounded-lg p-4 w-[300px] z-50 border border-gray-200">
              {/* year */}
              <div className="mb-2 mt-[-8px]">
                <label className="text-sm text-gray-600">Year</label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-2"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* month */}
              <div className="mb-2">
                <label className="text-sm text-gray-600">Month</label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-2"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* day */}
              <div className="mb-2">
                <label className="text-sm text-gray-600">Day</label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-2"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* 확인버튼 */}
              <button
                className="w-full mt-2 bg-[#3da8f5] text-white py-2 rounded"
                onClick={() => {
                  const y = year.toString();
                  const m = month.toString().padStart(2, "0");
                  const d = day.toString().padStart(2, "0");

                  setBirth(`${y}${m}${d}`);
                  setOpen(false);
                }}
              >
                선택하기
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-[#333] mb-2">태어난 시간</label>
          <div className="relative">
            <select 
              className="w-full h-12 pl-4 text-[#333] border border-[#ddd] rounded focus:border-[#3da8f5] focus:outline-none appearance-none bg-white"
              value={time}
              onChange={handleChange}
            >
              {TIME_OPTIONS.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <Clock className="absolute right-4 top-3.5 w-5 h-5 text-[#999]" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-[#333] mb-2">양력/음력</label>
            <div className="flex h-12 border border-[#ddd] rounded overflow-hidden">
              <button 
                className={
                  `flex-1 font-medium
                  ${solar ? "bg-[#3da8f5] text-white" : "bg-white text-[#333] hover:bg-[#f9f9f9]"}`
                }
                onClick={() => {setSolar(true); setLunar(false);}}
              >
                양력
              </button>
              <button 
                className={
                  `flex-1 font-medium
                  ${lunar ? "bg-[#3da8f5] text-white" : "bg-white text-[#333] hover:bg-[#f9f9f9]"}`
                }
                onClick={() => {setSolar(false); setLunar(true);}}
              >
                음력
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-bold text-[#333] mb-2">성별</label>
            <div className="flex h-12 border border-[#ddd] rounded overflow-hidden">
              <button
                className={
                  `flex-1 font-medium
                  ${man ? "bg-[#3da8f5] text-white" : "bg-white text-[#333] hover:bg-[#f9f9f9]"}`
                }
                onClick={() => {setMan(true); setWoman(false);}}
              >
                남성
              </button>
              <button
                className={
                  `flex-1 font-medium
                  ${woman ? "bg-[#3da8f5] text-white" : "bg-white text-[#333] hover:bg-[#f9f9f9]"}`
                }
                onClick={() => {setWoman(true); setMan(false);}}
              >
                여성
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            const ok = season(birth);
            if (ok) {
              setStep("result");
            }
          }}
          className="w-full h-14 bg-[#3da8f5] text-white font-bold text-lg rounded mt-4 hover:bg-[#318acc] shadow-sm transition-colors"
        >
          운세 결과 보기
        </button>
      </div>
    </div>
  );
};

export default Input;