import React from "react";
import { createRoot } from "react-dom/client";
import { CardsPage } from "./pages/CardsPage/index";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <CardsPage />
    </React.StrictMode>
  );
} else {
  console.error("root element not found");
}
