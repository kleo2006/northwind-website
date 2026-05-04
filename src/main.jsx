import "@vitejs/plugin-react/preamble";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "./context/ThemeContext";
// import { HelmetProvider } from "react-helmet-async";
// import "./styles/global.css";
// import App from "./App";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <HelmetProvider>
//       <BrowserRouter>
//         <ThemeProvider>
//           <App />
//         </ThemeProvider>
//       </BrowserRouter>
//     </HelmetProvider>
//   </StrictMode>
// );