import React, { useState } from 'react'

const POKEMON_TYPES = [
    'fire',
    'water',
    'bug',
    'grass',
    'poison',
    'fairy',
    'normal',
    'electric',
    'ground'
]

export default function FilterTypesPokemon() {
  const [typefilters, setTypeFilters] = useState({
    fire: false,
    water: false,
    bug: false,
    grass: false,
    poison: false,
    fairy: false,
    normal: false,
    electric: false,
    ground: false
  })

  const handleFilterType = (type, value) =>{
    const newTypeFilter = {...typefilters}
    newTypeFilter[type] = value
    setTypeFilters(newTypeFilter)
  }

  return (
      POKEMON_TYPES.map((type, key) => {
      return (
        <>
          <label>{type}</label>
          <input type="checkbox" onChange={(e) => handleFilterType(type, e.target.checked)} name={type} id={type}/>
        </>
      
      )
      }
    )
      
  )
}
