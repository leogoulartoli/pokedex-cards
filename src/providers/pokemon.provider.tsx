import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PokemonProps } from "../components/ListPokemon";
import { useGetPokemon } from "../hooks/use-get-pokemon.hook";
import { useLocalStorage } from "../hooks/use-local-storage.hook";

interface PokemonContextType {
  pokemons: PokemonProps[];
  fetching: boolean;
  handleFetchPokemon: () => void;
}

const PokemonContext = createContext({} as PokemonContextType);

export const usePokemonContext = () =>
  useContext(PokemonContext) as PokemonContextType;

const LIMIT_SHOWN_POKEMONS = 20;

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const { getItem, setItem } = useLocalStorage();
  const [fetching, setFetching] = useState(false);
  const pokemonFromLocalStorage = getItem("pokemons");
  const [offsetPokemons, setOffsetPokemons] = useState(
    pokemonFromLocalStorage?.offset || 0
  );
  const [pokemons, setPokemons] = useState<PokemonProps[]>(
    pokemonFromLocalStorage?.pokemonList || []
  );
  const { fetchPokemonData } = useGetPokemon();

  const handleFetchPokemon = async () => {
    setFetching(true);
    const offset = offsetPokemons + LIMIT_SHOWN_POKEMONS;
    setOffsetPokemons(offset);
    const pokemonList: PokemonProps[] = [...pokemons];
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_SHOWN_POKEMONS}&offset=${offset}`
    );
    for (const pokemon of response.data.results) {
      const pokemonData = await fetchPokemonData(pokemon.url);
      if (pokemonData) pokemonList.push(pokemonData);
    }
    const pokemonListSorted = pokemonList.sort((a, b) => a.id - b.id);
    setPokemons(pokemonListSorted);
    setItem("pokemons", {
      pokemonList: pokemonListSorted,
      offset: offset,
    });
    setFetching(false);
  };

  useEffect(() => {
    if (!pokemonFromLocalStorage) handleFetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, fetching, handleFetchPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
