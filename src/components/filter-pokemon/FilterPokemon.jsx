import React, { useState } from "react";
import SearchIcon from "../../assets/icons/lupa.svg";
import "./style.css";

const FilterPokemon = ({filteredName}) => {

const handleInput = (event) => {
    filteredName(event.target.value);
} 

  return (
    <nav className="container__filter">
      <div className="container__filter-button">
        <input className="filter__input" type="text" onChange={handleInput}/>
        <img className="filter__button" src={SearchIcon} alt="Magnifier icon" />
      </div>
    </nav>
  );
};

export default FilterPokemon;
