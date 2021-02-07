import { ACTION } from '../context/PokedexContext';
import axios from 'axios';
import ColorUtil from '../utils/ColorUtil';

const fetchPokemons = async (dispatch) => {
  try {
    dispatch({ type: ACTION.FETCH_ALL_POKEMONS_REQUEST });
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

    dispatch({
      type: ACTION.FETCH_ALL_POKEMONS_SUCCEED,
      payload: pokemons,
    });
  } catch (e) {
    dispatch({
      type: ACTION.FETCH_ALL_POKEMONS_FAIL,
      payload: e.response?.data.message ?? e.message,
    });
  }
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
