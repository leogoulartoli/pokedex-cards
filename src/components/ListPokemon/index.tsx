import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../hooks/use-local-storage.hook";
import { LoadingSpinner } from "../LoadingSpinner";
import { PokemonCard } from "../PokemonCard";
import "./style.scss";

interface ListPokemonProps {
  filteredName: string;
  filteredTypes: Set<string>;
}

export interface PokemonProps {
  id: number;
  name: string;
  image: string;
  number: string;
  type: string;
}

const limitShownPokemonsDefault = 20;

const ListPokemon = ({ filteredName, filteredTypes }: ListPokemonProps) => {
  const { t } = useTranslation();
  const { getItem, setItem } = useLocalStorage();
  const pokemonFromLocalStorage = getItem("pokemons");

  const [pokemons, setPokemons] = useState<PokemonProps[]>(
    pokemonFromLocalStorage?.pokemonList || []
  );
  const [fetching, setFetching] = useState(false);
  const [offsetPokemons, setOffsetPokemons] = useState(
    pokemonFromLocalStorage?.offset || 0
  );

  const fetchPokemonData = async (url: string) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        number: data.order,
        type: data.types[0].type.name,
      };
      return pokemon;
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPokemonList = async (offset: number) => {
    setFetching(true);
    const pokemonList: PokemonProps[] = [...pokemons];
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limitShownPokemonsDefault}&offset=${offset}`
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
    if (!pokemonFromLocalStorage) fetchPokemonList(offsetPokemons);
  }, []);

  const validateInput = (pokemonName: string) => {
    if (filteredName !== "") {
      const regex = new RegExp(filteredName.toLowerCase() + "\\w+");
      return regex.test(pokemonName.toLowerCase());
    }
    return true;
  };

  const handleShowMorePokemons = (offset: number) => {
    fetchPokemonList(offset);
    setOffsetPokemons(offset);
  };

  return (
    <section className="container">
      {pokemons.map((pokemon: PokemonProps) => {
        const { name, type } = pokemon;
        if (
          validateInput(name) &&
          (!filteredTypes.size || filteredTypes.has(type))
        ) {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
        }
        return <></>;
      })}
      <div className="container__button">
        {fetching ? (
          <LoadingSpinner />
        ) : (
          <button
            className="primary-button"
            onClick={() => handleShowMorePokemons(offsetPokemons + 20)}
          >
            {t("pokemon.showMore")}
          </button>
        )}
      </div>
    </section>
  );
};

export default ListPokemon;
