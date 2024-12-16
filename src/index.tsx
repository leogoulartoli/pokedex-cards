import React from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "./i18n/config";
import { CardsPage } from "./pages/CardsPage/index";
import { PokemonProvider } from "./providers/pokemon.provider";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <PokemonProvider>
      <CardsPage />
    </PokemonProvider>
  );
} else {
  console.error("root element not found");
}
