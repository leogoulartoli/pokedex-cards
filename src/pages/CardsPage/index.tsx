import React, { useState } from "react";
import FilterPokemon from "../../components/FilterPokemon";
import ListPokemon from "../../components/ListPokemon";

export const CardsPage = () => {
  const [filteredName, setFilteredName] = useState("");
  const [filteredTypes, setFilteredTypes] = useState<Set<string>>(new Set());

  const handleFilteredName = (filteredName: string) => {
    setFilteredName(filteredName);
  };

  const handleFilteredTypes = (types: Set<string>) => {
    setFilteredTypes(types);
  };

  return (
    <div className="App">
      <header>
        <FilterPokemon
          filteredName={handleFilteredName}
          filteredTypes={handleFilteredTypes}
        />
      </header>
      <main>
        <ListPokemon
          filteredName={filteredName}
          filteredTypes={filteredTypes}
        />
      </main>
    </div>
  );
};
