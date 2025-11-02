import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure theme is applied before React renders
const applyTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Apply theme immediately
applyTheme();

createRoot(document.getElementById("root")!).render(<App />);
