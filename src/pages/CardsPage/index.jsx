import React, { useState } from 'react'
import FilterPokemon from '../../components/FilterPokemon';
import ListPokemon from '../../components/ListPokemon';

export default function CardsPage() {
    const [filteredName, setFilteredName] = useState('');

    const handleFilteredName = (filteredName) => {
        setFilteredName(filteredName);
    }

    let lng = window.navigator.userLanguage || window.navigator.language;
    console.log(lng);

  return (
    <div className="App">   
        <header>
            <FilterPokemon filteredName={handleFilteredName}/>
        </header>
        <main>
            <ListPokemon filteredName={filteredName}/>
        </main>
    </div>
  )
}
