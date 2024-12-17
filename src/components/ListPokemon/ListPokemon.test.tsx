import { render, screen } from "@testing-library/react";
import React from "react";
import { usePokemonContextSpy } from "../../utils/use-spies";
import ListPokemon from "./index";

describe("ListPokemon", () => {
  const defaultMockData = {
    pokemons: [
      {
        id: 1,
        name: "Bulbasaur",
        image: "bulbasaur.png",
        number: "1",
        type: "grass",
      },
      {
        id: 4,
        name: "Charmander",
        image: "charmander.png",
        number: "4",
        type: "fire",
      },
    ],
    fetching: false,
    handleFetchPokemon: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    usePokemonContextSpy(defaultMockData);
  });

  const renderListPokemon = ({
    filteredName = "",
    filteredTypes = new Set(),
  }: {
    filteredName?: string;
    filteredTypes?: Set<string>;
  } = {}) => {
    return render(
      <ListPokemon filteredName={filteredName} filteredTypes={filteredTypes} />
    );
  };

  it("renders pokemon list correctly", () => {
    renderListPokemon();
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.getByText("pokemon.showMore")).toBeInTheDocument();
  });

  it("filters pokemon by name correctly", () => {
    renderListPokemon({ filteredName: "charm" });
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });

  it("filters pokemon by type correctly", () => {
    renderListPokemon({ filteredTypes: new Set(["fire"]) });
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
  });

  it("shows loading spinner when fetching", () => {
    usePokemonContextSpy({ fetching: true });

    renderListPokemon();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("calls handleFetchPokemon when show more is clicked", () => {
    const mockHandleFetchPokemon = jest.fn();
    usePokemonContextSpy({ handleFetchPokemon: mockHandleFetchPokemon });

    renderListPokemon();
    screen.getByText("pokemon.showMore").click();
    expect(mockHandleFetchPokemon).toHaveBeenCalledTimes(1);
  });

  it("handles empty pokemon list", () => {
    usePokemonContextSpy({ pokemons: [] });
    renderListPokemon();
    expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
    expect(screen.getByText("pokemon.showMore")).toBeInTheDocument();
  });
});
