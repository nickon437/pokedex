import PokeGrid from './PokeGrid.js';
import PokeList from './PokeList.js';
const fetchPokemon = async () => {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const NUM_OF_POKEMON = 30;
    const promises = [];
    for (let i = 1; i <= NUM_OF_POKEMON; i++) {
        const pokemonUrl = BASE_URL + i;
        promises.push(fetch(pokemonUrl).then((result) => result.json()));
    }
    const pokemons = await Promise.all(promises);
    PokeGrid(pokemons);
    PokeList(pokemons);
};
fetchPokemon();
