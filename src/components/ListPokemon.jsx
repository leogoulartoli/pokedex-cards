import React, { useState } from 'react';
import pokedex from '../assets/data.js';
import './style.css';

const ListPokemon = () => {
    const [pokemons, setPokemons] = useState(pokedex);
    return (
        <section className="container">
          {pokemons.map((pokemon) =>{
            const {id, image, name} = pokemon;
            return (
              <div className="card" key={id}>
                <img src={image} alt="teste"/>
                <h4 className="card__title">{name}</h4>
              </div>
            );
          })}
        </section>
    );
};

export default ListPokemon;