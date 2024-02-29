"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./sidebar.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import { GiHeartInside, GiPartyPopper } from "react-icons/gi";
import { FaMountain, FaHeart, FaUmbrellaBeach, FaCouch, FaUsers, FaGlassCheers } from 'react-icons/fa';

function getIconByTheme(theme) {
  switch (theme) {
    case 'adventurer':
      return <FaMountain />;
    case 'romantic':
      return <FaHeart />;
    case 'beach':
      return <FaUmbrellaBeach />;
    case 'relax':
      return <FaCouch />;
    case 'family':
      return <FaUsers />;
    case 'party':
      return <FaGlassCheers />;
    default:
      return null;
  }
}

function Sidebar() {
  const { setTheme, themes, theme } = useContext(ThemeContext); // Add 'theme' here

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

  const icon = getIconByTheme(theme);

  return (
    <div className={`${styles.sidebar} ${isNavOpen ? styles.navOpen : styles.navClose}`}>
      <div
        className={`${styles.hamburgerButton} ${isNavOpen ? "open" : "close"}`}
        onClick={handleHamburgerClick}
      >
        <div className={styles.themeMenu}>
         <GiHeartInside/>
          <p className={styles.navItem__text}>Travel Mood</p>
        </div>
      </div>
      <nav className={styles.nav}>
        {Object.keys(themes).map((themeKey) => (
          <p
            key={themeKey}
            className={styles.navItem}
            onClick={() => handleThemeChange(themeKey)}
          >
            {getIconByTheme(themeKey)}
            <span className={styles.navItem__text}>{themes[themeKey].name}</span>
          </p>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
// import React, { useState, useEffect, useContext } from "react";
// import { FaUser } from "react-icons/fa";
// import styles from "./sidebar.module.css";
// import { ThemeContext } from "@/context/ThemeContext";
// import { GiHeartInside, GiPartyPopper } from "react-icons/gi";




// function Sidebar() {
//   const icons = [GiPartyPopper, FaUser]
//   const { setTheme, themes } = useContext(ThemeContext);
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   const handleHamburgerClick = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   const handleWindowClick = (e) => {
//     if (!e.target.closest(`.${styles.sidebar}`)) {
//       setIsNavOpen(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("click", handleWindowClick);
//     return () => {
//       window.removeEventListener("click", handleWindowClick);
//     };
//   }, []);

//   const handleThemeChange = (selectedTheme) => {
//     setTheme(selectedTheme);
//     setIsNavOpen(false);
//   };

//   return (
//     <div className={`${styles.sidebar} ${isNavOpen ? styles.navOpen : styles.navClose}`}>
//       <div
//         className={`${styles.hamburgerButton} ${isNavOpen ? "open" : "close"}`}
//         onClick={handleHamburgerClick}
//       >
        
//         <div className={styles.themeMenu}>
//   <GiHeartInside />
//   <p className={styles.navItem__text}>Travel Mood</p>
// </div>
//       </div>
//       <nav className={styles.nav}>
//         {Object.keys(themes).map((themeKey) => (
//           <p
//             key={themeKey}
//             className={styles.navItem}
//             onClick={() => handleThemeChange(themeKey)}
//           >
  
//             {/* <FaUser /> */}
//             <span className={styles.navItem__text}>{themes[themeKey].name}</span>

//           </p>
//         ))}
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;
