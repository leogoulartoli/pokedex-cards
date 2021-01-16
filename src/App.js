import { useState } from "react";
import "./App.css";
import FilterPokemon from "./components/filter-pokemon/FilterPokemon";
import ListPokemon from "./components/list-pokemon/ListPokemon.jsx";

function App() {

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
  );
}

export default App;
