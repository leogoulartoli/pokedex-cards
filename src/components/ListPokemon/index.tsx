import React, { useState } from "react";
import pokedex from "../../assets/data";
import "./style.scss";

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

const ListPokemon = ({ filteredName, filteredTypes }: ListPokemonProps) => {
  const [pokemons] = useState(pokedex);

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
    </section>
  );
};

export default ListPokemon;
