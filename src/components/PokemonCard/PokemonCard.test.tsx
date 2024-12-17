import { render, screen } from "@testing-library/react";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import { PokemonCard } from "./index";

const mockPokemon = {
  id: 1,
  name: "Bulbasaur",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  number: "1",
  type: "grass",
};

describe("PokemonCard", () => {
  const renderPokemonCard = () => {
    render(
      <I18nextProvider i18n={i18n}>
        <PokemonCard pokemon={mockPokemon} />
      </I18nextProvider>
    );
  };

  it("renders pokemon information correctly", () => {
    renderPokemonCard();

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockPokemon.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", mockPokemon.name);
  });

  it("applies correct type class", () => {
    renderPokemonCard();

    const card = screen.getByTestId("1");
    expect(card).toHaveClass("type__grass");
  });
});
