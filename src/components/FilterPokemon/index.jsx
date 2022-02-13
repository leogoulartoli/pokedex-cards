import React, { useState } from "react";
import {ReactComponent as SearchIcon} from "../../assets/icons/magnifier.svg";
import FilterTypesPokemon from '../FilterTypesPokemon'
import "./style.scss";

const FilterPokemon = ({filteredName}) => {

const handleInput = (event) => {
    filteredName(event.target.value);
} 

  return (
    <nav>
      <div className="container__filter">
        <div className="container__filter-button">
          <input className="filter__input" type="text" onChange={handleInput}/>
          <SearchIcon className="filter__button"/>
        </div>
        <div className="container__filter-types">
          <FilterTypesPokemon />
        </div>
      </div>
    </nav>
  );
};

export default FilterPokemon;
