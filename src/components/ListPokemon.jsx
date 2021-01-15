import React, { useState } from 'react';
import pokedex from '../assets/data.js';
import './style.css';

const ListPokemon = () => {
    const [pokemons, setPokemons] = useState(pokedex);
    return (
        <section className="container">
          {pokemons.map((pokemon) =>{
            const {id, image, name, number, type} = pokemon;
            return (
              <div className={"card " + "type__" + type} key={id}>
                <img src={image} alt={name}/>
                <h4 className="card__title">{name}</h4>
                <h6 className="card__number">#{number}</h6>
              </div>
            );
          })}
        </section>
    );
};

export default ListPokemon;