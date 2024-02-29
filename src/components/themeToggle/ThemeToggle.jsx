"use client"
import React, { useContext, useState } from "react";
import styles from "./themeToggle.module.css";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme, themes } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowMenu(false);
  };

  const icon = getIconByTheme(theme);

  return (
    <div className={`${styles.themeToggleContainer} ${theme}`}>
      <div
        className={styles.themeToggle}
        onClick={() => setShowMenu(!showMenu)}
      >
        {icon} Theme
      </div>

      {showMenu && (
        <div className={styles.themeDropdown}>
          <ul>
            {Object.keys(themes).map((themeKey) => (
              <li
                key={themeKey}
                onClick={() => handleThemeChange(themeKey)}
                className={styles[themeKey]}
                style={{
                  backgroundColor: themes[themeKey].hoverBg,
                  color: themes[themeKey].hoverTextColor,
                }}
              >
                {getIconByTheme(themeKey)} {themeKey}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;

// import React, { useContext, useState } from "react";
// import styles from "./themeToggle.module.css";
// import { ThemeContext } from "@/context/ThemeContext";

// const ThemeToggle = () => {
//   const { theme, setTheme, themes } = useContext(ThemeContext);
//   const [showMenu, setShowMenu] = useState(false);

//   const handleThemeChange = (selectedTheme) => {
//     setTheme(selectedTheme);
//     setShowMenu(false);
//   };

//   return (
//     <div className={`${styles.themeToggleContainer} ${theme}`}>
//       <div
//         className={styles.themeToggle}
//         onClick={() => setShowMenu(!showMenu)}
//       >
//         Theme
//       </div>

//       {showMenu && (
//         <div className={styles.themeDropdown}>
//           <ul>
//             {Object.keys(themes).map((themeKey) => (
//               <li
//                 key={themeKey}
//                 onClick={() => handleThemeChange(themeKey)}
//                 className={styles[themeKey]}
//                 style={{
//                   backgroundColor: themes[themeKey].hoverBg,
//                   color: themes[themeKey].hoverTextColor,
//                 }}
//               >
//                 {themeKey}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeToggle;
