"use client"
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
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
    light: {
      backgroundColor: "white",
      textColor: "#643d87"
    },
    dark: {  
      backgroundColor: "#363062",
      textColor: "#ffe7cc"  
    },
    blue: {
      backgroundColor: "#1E90FF",
      textColor: "#ff9666"
    },
    green: {
      backgroundColor: "#229d20",    
      textColor: "#ffe270"   
    },
    orange: {
      backgroundColor: "#d93900",  
      textColor: "#e8f7fe"
    },
    purple: {
      backgroundColor: "#671e90",
      textColor: "#a582ff"
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme: setThemeByKey, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
