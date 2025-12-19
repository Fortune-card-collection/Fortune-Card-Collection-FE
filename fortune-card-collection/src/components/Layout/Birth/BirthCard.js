import React, { useEffect, useState } from "react";
import whiteCircle from "../../../assets/images/whiteCircle.svg";
import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_DOMAIN_KEY;

export default function BirthCard({ cardimg, Birth, Man, Solar, Time }) {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    BirthChoose();
  }, []);

  const BirthChoose = async () => {
    const isMale = Man[0]; // 만약 man이 true면 남성
    const gender = isMale ? "남성" : "여성";

    // Solar 배열: [solar, lunar]
    const isSolar = Solar[0]; // solar이 true면 양력
    const calendar = isSolar ? "solar" : "lunar";
    const time = Time.split(" ")[0];
    // console.log("시간:",time);

    const birth = {
      birthDate: Birth,
      birthTime: time,
      lunarType: calendar,
      gender: gender,
    };
    try {
      // console.log("birth:",birth);
      const response_birth = await axios.patch(
        `${backendURL}/users/me`,
        birth,
        { withCredentials: true }
      );
      // console.log("답변",response_birth.data);
      setUserData(response_birth.data);
    } catch (error) {
      if (error.response_birth) {
        // ❌ 서버 에러 응답
        console.error(
          `❗ 오류 (${error.response_birth.status}):`,
          error.response_birth.data
        );
      } else if (error.request) {
        // ❗ 네트워크 에러
        console.error("🌐 서버 응답 없음:", error.message);
      } else {
        // ❗ 기타 에러
        console.error("⚠️ 요청 실패:", error.message);
      }
    }
    try {
      const response = await axios.post(
        `${backendURL}/fortune/personal/today`,
        userData,
        { withCredentials: true }
      );
      const responseMessage = response.data.message;
      // console.log("메세지",responseMessage);
      setMessage(responseMessage);
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

  return (
    <div>
      {message === "" ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="duration-500 mt-9 mb-9">
          <div className="flex justify-center items-center">
            <div className="relative w-[368.1px] h-[500px] flex justify-center items-center">
              <img
                src={cardimg}
                alt="별 카드 이미지"
                className="absolute inset-0 w-full h-full object-cover shadow-shadow3 rounded-xl"
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
                <h2 className="text-black text-2xl font-bold drop-shadow-shadow2 mb-5">
                  {Birth.slice(0, 4)}.{Birth.slice(4, 6)}.{Birth.slice(6, 8)}{" "}
                  운세
                </h2>
                <p className="text-black overflow-auto text-left text-base drop-shadow-shadow2 whitespace-pre-line scrollbar-hide px-[25px] ml-2">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
