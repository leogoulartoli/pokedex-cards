import React from "react";
import { useTranslation } from "react-i18next";
import { PokemonProps } from "../ListPokemon";
import "./style.scss";

interface PokemonCardProps {
  pokemon: PokemonProps;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { id, image, name, number, type } = pokemon;
  const { t } = useTranslation();

  return (
    <div className={`card type__${type}`} key={id} data-testid={id}>
      <img src={image} alt={name} />
      <h4 className="card__title">{name}</h4>
      <h6 className="card__number">{t("pokemon.number", { number })}</h6>
    </div>
  );
};
