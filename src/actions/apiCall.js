import { ACTION } from '../context/PokedexContext';
import axios from 'axios';

const fetchPokemons = async (dispatch) => {
  try {
    dispatch({ type: ACTION.FETCH_ALL_POKEMONS_REQUEST });
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const NUM_OF_POKEMON = 386;
    // const NUM_OF_POKEMON = 251;
    // const NUM_OF_POKEMON = 151;
    // const NUM_OF_POKEMON = 12;
    // const NUM_OF_POKEMON = 3;
    const promises = [];
    for (let i = 1; i <= NUM_OF_POKEMON; i++) {
      const pokemonUrl = BASE_URL + i;
      const pokemonPromise = axios.get(pokemonUrl);
      promises.push(pokemonPromise);
    }

    let doneCount = 0;
    const overallCount = promises.length;
    const loadedSection = document.querySelector('.loaded-section');

    const handleProgress = (result) => {
      doneCount++;
      const percentageDone = (doneCount / overallCount) * 100;
      loadedSection.style.width = `${percentageDone}%`;
      return result;
    };

    const pokemons = (
      await Promise.all(promises.map((p) => p.then(handleProgress)))
    ).map((res) => res.data);

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
  const pokemonSpeciesData = (await axios.get(pokemonSpeciesUrl)).data;
  setPkmSpecies(pokemonSpeciesData);

  const evolutionUrl = pokemonSpeciesData.evolution_chain.url;
  const evolutionData = (await axios.get(evolutionUrl)).data;
  setPkmEvolution(evolutionData);
};

export { fetchPokemons, fetchPkmData };
