import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import StarScreen from "./components/Layout/Star/ChooseStar";
import BirthScreen from "./components/Layout/Birth/Input";
import QuoteScreen from "./components/Layout/Quote/ChooseCard";

function App() {

  const [activeMenu, setActiveMenu] = useState("Star");

  return (
    <div className="App">
      <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>

      <main className="App-layout">
        {activeMenu === "Star" && <StarScreen />}
        {activeMenu === "Birth" && <BirthScreen />}
        {activeMenu === "Quote" && <QuoteScreen />}
      </main>

      <section className="App-footer">
        {(activeMenu === "Star" || activeMenu === "Birth")&& <Footer />}
      </section>

    </div>
  );
}

export default App;
