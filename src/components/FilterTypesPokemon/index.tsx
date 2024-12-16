import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

const POKEMON_TYPES = [
  "fire",
  "water",
  "bug",
  "grass",
  "poison",
  "fairy",
  "normal",
  "electric",
  "ground",
  "psychic",
  "rock",
  "fighting",
  "flying",
  "ice",
  "dragon",
  "ghost",
];

interface FilterTypesPokemonProps {
  filteredTypes: (type: Set<string>) => void;
}

export default function FilterTypesPokemon({
  filteredTypes,
}: FilterTypesPokemonProps) {
  const { t } = useTranslation();
  const [typeFiltered, setTypeFiltered] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterType = (type: string, value: boolean) => {
    const newTypeFiltered = new Set<string>([...typeFiltered]);
    if (value) newTypeFiltered.add(type);
    else newTypeFiltered.delete(type);
    setTypeFiltered(newTypeFiltered);
    filteredTypes(newTypeFiltered);
  };

  return (
    <div className="container__types-pokemon">
      <button className="secondary-button" onClick={() => setIsOpen(!isOpen)}>
        {t("filter.typeFilter")}
      </button>
      {isOpen && (
        <div className="container__types-pokemon-open">
          {POKEMON_TYPES.map((type, key) => (
            <div className="container__filter-types-checkbox" key={key}>
              <input
                type="checkbox"
                onChange={(e) => handleFilterType(type, e.target.checked)}
                name={type}
                id={type}
              />
              <label>{type}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
