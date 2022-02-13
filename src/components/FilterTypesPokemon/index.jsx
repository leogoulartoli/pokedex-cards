import React, { useState } from 'react'
import './style.scss'

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
    const newTypeFiltered = new Set([...typeFiltered])
    if(value) newTypeFiltered.add(type)
    else newTypeFiltered.delete(type)
    setTypeFiltered(newTypeFiltered)
    filteredTypes(newTypeFiltered)
  }

  return (<>
      {POKEMON_TYPES.map((type, key) => (
        <div className="container__filter-types-checkbox" key={key}>
          <input type="checkbox" onChange={(e) => handleFilterType(type, e.target.checked)} name={type} id={type}/>
          <label>{type}</label>
        </div>
      ))}
      </>
    )
}
