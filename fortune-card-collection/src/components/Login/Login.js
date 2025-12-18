const Login = () => {

    const KAKAO_REST_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = "https://fortune-card-collection.web.app/auth/kakao/login";

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
                    bg-[#FEE500]
                    text-[#3C1E1E]
                    font-extrabold
                    text-2xl
                    px-10 py-5
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
