"use client"
//ThemeContext.jsx
import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

import { FaMountain, FaHeart, FaUmbrellaBeach, FaCouch, FaUsers, FaGlassCheers } from 'react-icons/fa';
const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

const getIconByTheme = (theme) => {
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
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme((currentTheme) => {
      const themeKeys = Object.keys(themes);
      const currentIndex = themeKeys.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themeKeys.length;
      return themeKeys[nextIndex];
    });
  };

  const setThemeByKey = (themeKey) => {
    setTheme(themeKey);
  };

  const themes = {
    adventurer: {
      name: "Adventure Seeker",
    },
    romantic: {
      name: "Romantic Escape",
    },
    beach: {
      name: "Beach Bliss",
    },
    relax: {
      name: "Relaxation Haven",
    },
    family: {
      name: "Family Retreat",
    },
    party: {
      name: "Party Vibe",
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const icon = getIconByTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme: setThemeByKey, themes, icon }}>
      {children}
    </ThemeContext.Provider>
  );
};

// import React, { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// const getFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     const value = localStorage.getItem("theme");
//     return value || "light";
//   }
// };

// export const ThemeContextProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => {
//     return getFromLocalStorage();
//   });

//   const toggle = () => {
//     setTheme((currentTheme) => {
//       const themeKeys = Object.keys(themes);
//       const currentIndex = themeKeys.indexOf(currentTheme);
//       const nextIndex = (currentIndex + 1) % themeKeys.length;
//       return themeKeys[nextIndex];
//     });
//   };

//   const setThemeByKey = (themeKey) => {
//     setTheme(themeKey);
//   };

//   const themes = {
//     adventurer: {
//       name: "Adventure Seeker",
//     },
//     romantic: {
//       name: "Romantic Escape",
//     },
//     beach: {
//       name: "Beach Bliss",
//     },
//     relax: {
//       name: "Relaxation Haven",
//     },
//     family: {
//       name: "Family Retreat",
//     },
//     party: {
//       name: "Party Vibe",
//     }
//   };
  

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggle, setTheme: setThemeByKey, themes }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
