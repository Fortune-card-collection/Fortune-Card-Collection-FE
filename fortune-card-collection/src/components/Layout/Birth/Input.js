import React, {useState} from "react";
import { Search, Menu, Star, MessageCircle, Info, X, ChevronRight, Share2, RefreshCw, Calendar, Clock, Check } from 'lucide-react';

//생년월일 입력 폼
const Input = () => {
  const [step, setStep] = useState('input');

  if (step === 'result') {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-lg p-8 text-center mb-6">
            <h3 className="text-xl font-bold text-[#0369a1] mb-2">2025년 당신의 사주 총평</h3>
            <p className="text-[#0c4a6e] text-lg font-serif mb-6">"비 온 뒤에 땅이 굳어지듯, 결실을 맺는 시기"</p>
            <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
               <div className="bg-white p-4 rounded border border-blue-100">
                  <div className="text-xs text-gray-500 mb-1">재물운</div>
                  <div className="font-bold text-blue-600">85점</div>
               </div>
               <div className="bg-white p-4 rounded border border-blue-100">
                  <div className="text-xs text-gray-500 mb-1">애정운</div>
                  <div className="font-bold text-pink-500">95점</div>
               </div>
            </div>
         </div>
         <button onClick={() => setStep('input')} className="px-6 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 font-medium text-sm">
           다시 입력하기
         </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="space-y-4">
         <div>
           <label className="block text-sm font-bold text-[#333] mb-2">생년월일</label>
           <div className="relative">
             <input type="text" placeholder="예: 19950101" className="w-full h-12 pl-4 border border-[#ddd] rounded focus:border-[#3da8f5] focus:outline-none" />
             <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-[#999]" />
           </div>
         </div>
         <div>
           <label className="block text-sm font-bold text-[#333] mb-2">태어난 시간</label>
           <div className="relative">
             <select className="w-full h-12 pl-4 border border-[#ddd] rounded focus:border-[#3da8f5] focus:outline-none appearance-none bg-white">
               <option>시간 모름</option>
               <option>자시 (23:30 ~ 01:29)</option>
               <option>축시 (01:30 ~ 03:29)</option>
             </select>
             <Clock className="absolute right-4 top-3.5 w-5 h-5 text-[#999]" />
           </div>
         </div>
         <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-[#333] mb-2">양력/음력</label>
              <div className="flex h-12 border border-[#ddd] rounded overflow-hidden">
                 <button className="flex-1 bg-[#3da8f5] text-white font-medium">양력</button>
                 <button className="flex-1 bg-white text-[#666] hover:bg-[#f9f9f9]">음력</button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-[#333] mb-2">성별</label>
              <div className="flex h-12 border border-[#ddd] rounded overflow-hidden">
                 <button className="flex-1 bg-white text-[#666] hover:bg-[#f9f9f9]">남성</button>
                 <button className="flex-1 bg-white text-[#666] hover:bg-[#f9f9f9]">여성</button>
              </div>
            </div>
         </div>
         <button onClick={() => setStep('result')} className="w-full h-14 bg-[#3da8f5] text-white font-bold text-lg rounded mt-4 hover:bg-[#318acc] shadow-sm transition-colors">
           운세 결과 보기
         </button>
      </div>
    </div>
  );
};


export default Input;