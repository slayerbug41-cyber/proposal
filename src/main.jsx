import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/noto-sans-bengali/300.css";
import "@fontsource/noto-sans-bengali/400.css";
import "@fontsource/noto-sans-bengali/500.css";
import "@fontsource/noto-sans-bengali/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/galada/400.css";
import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
