import * as pokemonProvider from "../providers/pokemon.provider";

export const usePokemonContextSpy = (
  pokemonContext: Partial<pokemonProvider.PokemonContextType> = {}
) => {
  jest.spyOn(pokemonProvider, "usePokemonContext").mockReturnValue({
    pokemons: [],
    fetching: false,
    handleFetchPokemon: jest.fn(),
    ...pokemonContext,
  });
};
