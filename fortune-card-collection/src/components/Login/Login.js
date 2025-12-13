const Login = () => {

    const KAKAO_REST_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = "http://localhost:3000/auth/kakao/login";

    const handleLogin = () => {
        console.log("로그인 화면으로 넘어가는 중...");
        const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoAuthURL;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <button
                onClick={handleLogin}
                className="
                    bg-[#FEE500]        /* 카카오 노란색 */
                    text-[#3C1E1E]      /* 글자 색 */
                    font-extrabold
                    text-2xl            /* 글자 크게 */
                    px-10 py-5          /* 버튼 패딩 크게 */
                    rounded-xl
                    shadow-lg
                    hover:shadow-2xl
                    hover:scale-105
                    transition
                    duration-200
                    active:scale-95
                    flex items-center justify-center
                    gap-3
                "
            >
                카카오 로그인
            </button>
        </div>
    );

};

export default Login;
