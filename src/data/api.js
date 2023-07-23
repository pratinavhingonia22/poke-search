
import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (page, limit) => {
  const offset = (page - 1) * limit;
  const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon`, {
    params: { offset, limit },
  });
  return response.data;
};

export const fetchPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};


export const fetchAllPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    return data;
  };
  