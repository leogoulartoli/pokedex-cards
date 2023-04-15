import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";

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
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [limitShownPokemons, setLimitShownPokemons] = useState(
    limitShownPokemonsDefault
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
      console.log(e);
    }
  };

  console.log("limitShownPokemons", limitShownPokemons);

  const fetchPokemonList = async () => {
    const pokemonList: PokemonProps[] = [];
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limitShownPokemons}&offset=0`
    );
    for (const pokemon of response.data.results) {
      const pokemonData = await fetchPokemonData(pokemon.url);
      if (pokemonData) pokemonList.push(pokemonData);
    }
    setPokemons(pokemonList.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    fetchPokemonList();
  }, [limitShownPokemons]);

  const validateInput = (pokemonName: string) => {
    if (filteredName !== "") {
      const regex = new RegExp(filteredName + "\\w+");
      return regex.test(pokemonName);
    }
    return true;
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
          onClick={() => setLimitShownPokemons(limitShownPokemons + 20)}
        >
          Show More
        </button>
      </div>
    </section>
  );
};

export default ListPokemon;
