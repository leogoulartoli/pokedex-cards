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

export default function FilterTypesPokemon({filteredTypes}) {
  const [typeFiltered, setTypeFiltered] = useState(new Set())

  const handleFilterType = (type, value) =>{
    const newTypeFiltered = typeFiltered
    if(value) newTypeFiltered.add(type)
    else newTypeFiltered.delete(type)
    setTypeFiltered(newTypeFiltered)
    filteredTypes(newTypeFiltered)
  }

  return (
      POKEMON_TYPES.map((type, key) => {
      return (
        <>
          <input type="checkbox" onChange={(e) => handleFilterType(type, e.target.checked)} name={type} id={type}/>
          <label>{type}</label>
        </>
      
      )
      }
    )
      
  )
}
