import React, { useState } from 'react'
import FilterPokemon from '../../components/FilterPokemon';
import ListPokemon from '../../components/ListPokemon';

export default function CardsPage() {
    const [filteredName, setFilteredName] = useState('');
    const [filteredTypes, setFilteredTypes] = useState(new Set());

    const handleFilteredName = (filteredName) => {
        setFilteredName(filteredName);
    }

    const handleFilteredTypes = (types) => {
        setFilteredTypes(types);
    }

    let lng = window.navigator.userLanguage || window.navigator.language;
    console.log(lng);

  return (
    <div className="App">   
        <header>
            <FilterPokemon filteredName={handleFilteredName} filteredTypes={handleFilteredTypes}/>
        </header>
        <main>
            <ListPokemon filteredName={filteredName} filteredTypes={filteredTypes}/>
        </main>
    </div>
  )
}
