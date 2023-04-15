import React from "react";
import { render } from "react-dom";
import { CardsPage } from "./pages/CardsPage/index";
import "./index.css";

render(
  <React.StrictMode>
    <CardsPage />
  </React.StrictMode>,
  document.getElementById("root")
);
