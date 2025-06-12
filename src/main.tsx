import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Force maintenance mode
sessionStorage.setItem("maintenanceMode", "true");

// Ancien code avec query param (désactivé)
// const urlParams = new URLSearchParams(window.location.search);
// const isMaintenanceMode = urlParams.get("maintenance") === "true";
// if (isMaintenanceMode) {
//   sessionStorage.setItem("maintenanceMode", "true");
// } else {
//   sessionStorage.removeItem("maintenanceMode");
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
