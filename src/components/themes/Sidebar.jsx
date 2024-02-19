"use client";
// Sidebar.js
import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import styles from "./sidebar.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { GiHeartInside } from "react-icons/gi";




function Sidebar() {
  const { setTheme, themes } = useContext(ThemeContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleWindowClick = (e) => {
    if (!e.target.closest(`.${styles.sidebar}`)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsNavOpen(false);
  };

  return (
    <div className={`${styles.sidebar} ${isNavOpen ? styles.navOpen : ""}`}>
      <div
        className={`${styles.hamburgerButton} ${isNavOpen ? "open" : ""}`}
        onClick={handleHamburgerClick}
      >
        <div className={styles.themeMenu}>
          {/* <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div> */}
          <GiHeartInside  />

        </div>
      </div>
      <nav className={styles.nav}>
        {Object.keys(themes).map((themeKey) => (
          <p
            key={themeKey}
            className={styles.navItem}
            onClick={() => handleThemeChange(themeKey)}
          >
            <FaUser />
            <span className={styles.navItem__text}>{themeKey}</span>
          </p>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
