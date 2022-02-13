import React, { useState } from 'react';
import pokedex from '../../assets/data.js';
import './style.scss';

const ListPokemon = ({filteredName, filteredTypes}) => {
    const [pokemons] = useState(pokedex);

    const validateInput = (pokemon) => {
      if(filteredName !== ""){
        let regex = new RegExp(filteredName+"\\w+");
        return regex.test(pokemon);
      } return true;
    }

    return (
        <section className="container">
          {pokemons.map((pokemon, key) =>{
            const {id, image, name, number, type} = pokemon;
            if(validateInput(name) && (!filteredTypes.size || filteredTypes.has(type))){
              return (
                <div className={`card type__${type}`} key={id}>
                  <img src={image} alt={name}/>
                  <h4 className="card__title">{name}</h4>
                  <h6 className="card__number">#{number}</h6>
                </div>
              );
            } return <></>;
          })}
        </section>
    );
};

export default ListPokemon;