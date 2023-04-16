import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { useLocalStorage } from "../../hooks/use-local-storage.hooks";

interface ListPokemonProps {
  filteredName: string;
  filteredTypes: Set<string>;
}

interface PokemonProps {
  id: number;
  name: string;
  image: string;
  number: string;
  type: string;
}

const limitShownPokemonsDefault = 20;

const ListPokemon = ({ filteredName, filteredTypes }: ListPokemonProps) => {
  const { getItem, setItem } = useLocalStorage();
  const pokemonFromLocalStorage = getItem("pokemons");

  const [pokemons, setPokemons] = useState<PokemonProps[]>(
    pokemonFromLocalStorage?.pokemonList || []
  );
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

  console.log(limitShownPokemonsDefault, offsetPokemons);

  const fetchPokemonList = async (offset: number) => {
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
  };

  useEffect(() => {
    if (!pokemonFromLocalStorage) fetchPokemonList(offsetPokemons);
  }, []);

  const validateInput = (pokemonName: string) => {
    if (filteredName !== "") {
      const regex = new RegExp(filteredName + "\\w+");
      return regex.test(pokemonName);
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
        const { id, image, name, number, type } = pokemon;
        if (
          validateInput(name) &&
          (!filteredTypes.size || filteredTypes.has(type))
        ) {
          return (
            <div className={`card type__${type}`} key={id}>
              <img src={image} alt={name} />
              <h4 className="card__title">{name}</h4>
              <h6 className="card__number">#{number}</h6>
            </div>
          );
        }
        return <></>;
      })}
      <div className="container__button">
        <button
          className="button__more"
          onClick={() => handleShowMorePokemons(offsetPokemons + 20)}
        >
          Show More
        </button>
      </div>
    </section>
  );
};

export default ListPokemon;
