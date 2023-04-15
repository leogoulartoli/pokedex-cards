import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/magnifier.svg";
import FilterTypesPokemon from "../FilterTypesPokemon";
import "./style.scss";

export interface FilterPokemonProps {
  filteredName: (name: string) => void;
  filteredTypes: (types: Set<string>) => void;
}

const FilterPokemon = ({ filteredName, filteredTypes }: FilterPokemonProps) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    filteredName(event.target.value);
  };

  return (
    <nav>
      <div className="container__filter">
        <div className="container__filter-button">
          <input className="filter__input" type="text" onChange={handleInput} />
          <SearchIcon className="filter__button" />
        </div>
        <div className="container__filter-types">
          <FilterTypesPokemon filteredTypes={(types) => filteredTypes(types)} />
        </div>
      </div>
    </nav>
  );
};

export default FilterPokemon;
