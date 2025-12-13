// KakaoCallback.tsx
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const domain = process.env.REACT_APP_BACKEND_DOMAIN_KEY;

const KakaoCallback = ({ setLogin }) => {
  const calledRef = useRef(false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const kakaoLogin = async (code) => {
    axios.get(
      `${domain}/auth/kakao/login?code=${code}`,
      { withCredentials: true }
    )
    .then ( (response) => {
      console.log("답변:", response);
      if ( response.data === "로그인 성공!" ) {
        setLogin("login");
      }
    }
    ).catch(err => {
      console.error("카카오 로그인 에러:", err);
    });
  };

  useEffect(() => {
    if (!code) return;

    if (calledRef.current) return;
    calledRef.current = true;

    console.log("code =", code);
    kakaoLogin(code);
  }, [code]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="
        bg-white
        text-[#3C1E1E]
        font-extrabold
        text-2xl
        px-10 py-5
        rounded-xl
        shadow-lg
        flex items-center justify-center
        gap-3
        animate-pulse    /* 깜빡임 효과 */
      ">
        카카오 로그인 처리 중...
      </div>
    </div>
  );
};

export default KakaoCallback;
