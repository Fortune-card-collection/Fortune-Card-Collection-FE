import React, {useEffect, useState} from "react";
import whiteCircle from "../../../assets/images/whiteCircle.svg";
import axios from "axios";

export default function BirthCard({ cardimg, onBack, Birth, Man, Solar, Time }) {
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("");

    const BirthChoose = async () => {
        const isMale = Man[0]; // 만약 man이 true면 남성
        const gender = isMale ? "남성" : "여성";

        // Solar 배열: [solar, lunar]
        const isSolar = Solar[0]; // solar이 true면 양력
        const calendar = isSolar ? "solar" : "lunar";

        const birth = {
            "birthDate": Birth,
            "birthTime": Time,
            "lunarType": calendar,
            "gender": gender,
        }
        try {
            const response = await axios.get(`http://localhost:8080/users/me`,{withCredentials: true});
           console.log(response);
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
        // try {
        //     console.log("birth:",birth);
        //     const response_birth = await axios.patch(`http://localhost:8080/users/me`,birth,{withCredentials: true});
        //     console.log("답변",response_birth.data);
        //     setUserData(response_birth.data);
        // } catch(error) {
        //     if (error.response_birth) {
        //     // ❌ 서버 에러 응답
        //     console.error(`❗ 오류 (${error.response_birth.status}):`, error.response_birth.data);
        //     } else if (error.request) {
        //     // ❗ 네트워크 에러
        //     console.error('🌐 서버 응답 없음:', error.message);
        //     } else {
        //     // ❗ 기타 에러
        //     console.error('⚠️ 요청 실패:', error.message);
        //     }
        // }
        // try {
        //     const response = await axios.post(`http://localhost:8080/fortune/personal/today`,userData,{withCredentials: true});
        //     const responseMessage = response.data.message;
        //     setMessage(responseMessage);
        // } catch(error) {
        //     if (error.response) {
        //         // ❌ 서버 에러 응답
        //         console.error(`❗ 오류 (${error.response.status}):`, error.response.data);
        //         if(error.response.data.includes("Query did not return a unique result: 2 results were returned")) {
        //             try {
        //                 const response_get = await axios.get(`http://localhost:8080/fortune/personal/today`,{ params: userData, withCredentials: true});
        //                 const responseMessage = response_get.data.message;
        //                 setMessage(responseMessage);
        //             } catch(error) {
        //                 if (error.response_get) {
        //                 // ❌ 서버 에러 응답
        //                 console.error(`❗ 오류 (${error.response_get.status}):`, error.response_get.data);
        //                 } else if (error.request) {
        //                 // ❗ 네트워크 에러
        //                 console.error('🌐 서버 응답 없음:', error.message);
        //                 } else {
        //                 // ❗ 기타 에러
        //                 console.error('⚠️ 요청 실패:', error.message);
        //                 }
        //             }
        //         }
        //     } else if (error.request) {
        //         // ❗ 네트워크 에러
        //         console.error('🌐 서버 응답 없음:', error.message);
        //     } else {
        //         // ❗ 기타 에러
        //         console.error('⚠️ 요청 실패:', error.message);
        //     }
        // }
    }

    useEffect(() => {
        BirthChoose();
    },[])

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
                        <p className="text-black space-pre-wrap h-[290px] overflow-auto text-left text-base drop-shadow-md px-5">
                            {message}
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
