
// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext(null);

// const getInitialTheme = () => {
//   return localStorage.getItem("northwind-theme") || "dark";
// };

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(getInitialTheme);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("northwind-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within ThemeProvider");
//   }
//   return context;
// }
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("northwind-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("northwind-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (ctx === null) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return ctx;
}

