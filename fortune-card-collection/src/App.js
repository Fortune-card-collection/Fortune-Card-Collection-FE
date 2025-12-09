import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import StarScreen from "./components/Layout/Star/ChooseStar";
import BirthScreen from "./components/Layout/Birth/Input";
import QuoteScreen from "./components/Layout/Quote/ChooseCard";
import StarCard from "./components/Layout/Star/StarCard";
import ZodiacModal from "./components/Layout/Star/ZodiacModal";
// function App() {

//   const [activeMenu, setActiveMenu] = useState("Star");

//   return (
//     <div className="App">
//       {/* <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu}/> */}

//       <main className="App-layout">
//         {activeMenu === "Star" && <StarScreen />}
//         {activeMenu === "Birth" && <BirthScreen />}
//         {activeMenu === "Quote" && <QuoteScreen />}
//       </main>

//       {/* <section className="App-footer">
//         {(activeMenu === "Star" || activeMenu === "Birth")&& <Footer />}
//       </section> */}

//     </div>
//   );
// }

// export default App;
import { Search, Menu, Star, MessageCircle, Calendar, } from 'lucide-react';
import ChooseStar from "./components/Layout/Star/ChooseStar";

const App = () => {
  const [activeTab, setActiveTab] = useState('star');
  const [selectedZodiacModal, setSelectedZodiacModal] = useState(null);
  const [selectedZodiac, setSelectedZodiac] = useState(null);

  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans text-[#333]">
      
      <main className="max-w-[1100px] mx-auto px-4 py-8 grid grid-cols-1">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <section className="mx-auto w-full">
          <div className="rounded-sm min-h-[700px] flex flex-col overflow-hidden">
            <div className="bg-white px-8 pt-8 pb-4 border-b border-[#f0f0f0] shadow-sm">
               <h2 className="text-2xl font-bold text-[#1e1e1e] flex items-center gap-2">
                 {activeTab === 'star' && <><Star className="w-6 h-6 text-yellow-400 fill-current"/> 오늘의 별자리 운세</>}
                 {activeTab === 'birth' && <><Calendar className="w-6 h-6 text-[#3da8f5]"/> 생년월일 운세</>}
                 {activeTab === 'quote' && <><MessageCircle className="w-6 h-6 text-[#3da8f5]"/> 오늘의 명언</>}
               </h2>
               <p className="text-sm text-[#888] mt-2">
                 {activeTab === 'star' && "원하는 별자리를 선택하여 오늘의 행운을 확인하세요."}
                 {activeTab === 'birth' && "생년월일을 입력하여 사주를 분석합니다."}
                 {activeTab === 'quote' && "마음을 비우고 카드를 선택하세요."}
               </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {activeTab === "star" && (
                <>
                  {!selectedZodiac && (
                    <ChooseStar
                      onSelect={(zodiac) => setSelectedZodiac(zodiac)}
                    />
                  )}

                  {selectedZodiac && (
                    <StarCard
                      selectedZodiac={selectedZodiac}
                      onSelect={(zodiac) => setSelectedZodiac(zodiac)}
                    />
                  )}
                </>
              )}
              {activeTab === 'birth' && <BirthScreen />}
              {activeTab === 'quote' && <QuoteScreen />}
            </div>
          </div>
        </section>
        <Footer />
      </main>

      <ZodiacModal zodiac={selectedZodiacModal} onClose={() => setSelectedZodiacModal(null)} />
      
    </div>
  );
};
export default App;