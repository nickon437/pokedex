import React, { useCallback, useContext, useEffect } from 'react';
import './App.scss';
import { PokedexContext } from './context/PokedexContext';
import PokeGrid from './components/PokeGrid';
import PokeList from './components/PokeList';
import DetailView from './components/DetailView';
import Generations from './components/Generations';

const App = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);

  const fetchPokemon = useCallback(async () => {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const NUM_OF_POKEMON = 251;
    // const NUM_OF_POKEMON = 151;
    // const NUM_OF_POKEMON = 12;
    // const NUM_OF_POKEMON = 3;
    const promises = [];
    let pokemons;
    for (let i = 1; i <= NUM_OF_POKEMON; i++) {
      const pokemonUrl = BASE_URL + i;
      promises.push(fetch(pokemonUrl).then((result) => result.json()));
    }
    pokemons = await Promise.all(promises);
    setCtxPokedex((prev) => ({
      ...prev,
      pokemons,
      filteredPokemons: pokemons,
    }));
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return (
    <>
      <header><div>POKEDEX</div></header>
      <div id="main" className={[ ctxPokedex.class.splitView && "split-view", ctxPokedex.class.reverseSplitView && "reverse-split-view" ].join(' ') }>
        <Generations />
        <PokeGrid />
        <PokeList />
        <DetailView />
      </div>
    </>
  );
}

export default App;
