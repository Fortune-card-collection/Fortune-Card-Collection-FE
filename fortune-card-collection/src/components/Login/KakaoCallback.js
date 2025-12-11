// KakaoCallback.tsx
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const KakaoCallback = ({ setLogin }) => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      console.log("코드 번호",code);
      axios.get(`http://localhost:8080/auth/kakao?code=${code}`,{withCredentials: true})
        .then(response => {
          console.log("답변:",response);
          if(response.data === '로그인 성공! 다음 단계에서 생년월일을 입력해주세요.') {
            console.log("로그인 성공");
            setLogin('login');
          }
          console.log(response.headers); 
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="
        text-[#3C1E1E]
        font-extrabold
        text-2xl
        px-10 py-5
        rounded-xl
        shadow-lg
        flex items-center justify-center
        gap-3
        animate-pulse           /* 깜빡임 효과 */
      ">
        카카오 로그인 처리 중...
      </div>
    </div>
  );
};

export default KakaoCallback;
