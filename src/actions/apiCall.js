import { ACTION } from '../context/PokedexContext';
import axios from 'axios';

const fetchPokemons = async (dispatch) => {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  // const NUM_OF_POKEMON = 386;
  // const NUM_OF_POKEMON = 251;
  // const NUM_OF_POKEMON = 151;
  const NUM_OF_POKEMON = 12;
  // const NUM_OF_POKEMON = 3;
  const promises = [];
  for (let i = 1; i <= NUM_OF_POKEMON; i++) {
    const pokemonUrl = BASE_URL + i;
    promises.push(axios.get(pokemonUrl).then((res) => res.data));
  }
  const pokemons = await Promise.all(promises);

  dispatch({ type: ACTION.COMPLETE_FETCH_POKEMONS, pokemons });
};

const fetchPkmData = async (id, setPkmSpecies, setPkmEvolution) => {
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const pokemonSpecies = await axios
    .get(pokemonSpeciesUrl)
    .then((res) => res.data);
  setPkmSpecies(pokemonSpecies);

  const evolutionUrl = pokemonSpecies.evolution_chain.url;
  setPkmEvolution(await axios.get(evolutionUrl).then((res) => res.data));
};

export { fetchPokemons, fetchPkmData };