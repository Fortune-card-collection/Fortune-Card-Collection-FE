import React, { useState } from "react";
import "./Header.css";

export default function Header({ activeMenu, setActiveMenu }) {

  return (
    <header className="header">
      <div className="header-inner">
        <div
          className={`menu-item ${activeMenu === "Star" ? "active" : ""}`}
          onClick={() => setActiveMenu("Star")}
        >
          별자리
        </div>
        <div
          className={`menu-item ${activeMenu === "Birth" ? "active" : ""}`}
          onClick={() => setActiveMenu("Birth")}
        >
          생년월일
        </div>
        <div
          className={`menu-item ${activeMenu === "Quote" ? "active" : ""}`}
          onClick={() => setActiveMenu("Quote")}
        >
          오늘의 명언
        </div>
      </div>
    </header>
  );
}
