import React from "react";
import { useTranslation } from "react-i18next";
import { usePokemonContext } from "../../providers/pokemon.provider";
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

const ListPokemon = ({ filteredName, filteredTypes }: ListPokemonProps) => {
  const { t } = useTranslation();
  const { pokemons, fetching, handleFetchPokemon } = usePokemonContext();

  const validateInput = (pokemonName: string) => {
    if (filteredName !== "") {
      const regex = new RegExp(filteredName.toLowerCase() + "\\w+");
      return regex.test(pokemonName.toLowerCase());
    }
    return true;
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
          <button className="primary-button" onClick={handleFetchPokemon}>
            {t("pokemon.showMore")}
          </button>
        )}
      </div>
    </section>
  );
};

export default ListPokemon;
