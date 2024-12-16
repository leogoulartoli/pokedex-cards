import axios from "axios";

export const useGetPokemon = () => {
  const fetchPokemonData = async (url: string) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        number: data.order,
        type: data.types[0].type.name,
      };
      return pokemon;
    } catch (e) {
      console.error(e);
    }
  };

  return { fetchPokemonData };
};
