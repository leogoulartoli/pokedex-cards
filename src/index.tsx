import React from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "./i18n/config";
import { CardsPage } from "./pages/CardsPage/index";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<CardsPage />);
} else {
  console.error("root element not found");
}
