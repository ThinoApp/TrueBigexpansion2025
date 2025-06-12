import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Check for maintenance mode in URL
const urlParams = new URLSearchParams(window.location.search);
const isMaintenanceMode = urlParams.get("maintenance") === "true";

// Store maintenance mode in session storage for App.tsx to access
if (isMaintenanceMode) {
  sessionStorage.setItem("maintenanceMode", "true");
} else {
  sessionStorage.removeItem("maintenanceMode");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
