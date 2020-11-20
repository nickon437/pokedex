import React, { useCallback, useContext, useEffect } from 'react';
import './App.css';
import { PokedexContext } from './context/PokedexContext';
import PokeGrid from './components/PokeGrid';
import PokeList from './components/PokeList';
import DetailView from './components/DetailView';

const App = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);

  const fetchPokemon = useCallback(async () => {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const NUM_OF_POKEMON = 10;
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
    }));
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  // Load ctx from local storage
  useEffect(() => {
    const pokedexContextData = JSON.parse(window.localStorage.getItem('pokedex-context'));
    if (pokedexContextData) {
      setCtxPokedex(pokedexContextData);
    }
  }, []);

  // Save ctx to local storage
  useEffect(() => {
    window.localStorage.setItem('pokedex-context', JSON.stringify(ctxPokedex));
    console.log('Upadte state');
  });

  return (
    <>
      <header><div>POKEDEX</div></header>
      <div id="main" className={[ ctxPokedex.class.splitView && "split-view", ctxPokedex.class.reverseSplitView && "reverse-split-view" ].join(' ') }>
        <PokeGrid />
        <PokeList />
        <DetailView />
      </div>
    </>
  );
}

export default App;
