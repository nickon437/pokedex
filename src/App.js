import React, { useCallback, useContext, useEffect } from 'react';
import './App.scss';
import { PokedexContext, ACTION } from './context/PokedexContext';
import PokeGrid from './components/PokeGrid';
import PokeList from './components/PokeList';
import DetailView from './components/DetailView';
import Generations from './components/Generations';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);

  const fetchPokemon = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const mainClasses = [
    ctxPokedex.class.mainView,
    ctxPokedex.class.splitView ? "split-view" : undefined,
    ctxPokedex.class.reverseSplitView ? "reverse-split-view" : undefined,
  ].join(' ');

  return (
    <Router>
      <header><div>POKEDEX</div></header>
      {/* <main id="main" className={mainClasses}> */}
      <main>
        <Route path='/' component={Generations} exact />
        {/* <Generations /> */}
        <Route path='/gen/:id' component={PokeGrid} />
        {/* <PokeGrid /> */}
        <Route path='/pokemon/:id' component={DetailView} />
        {/* <PokeList />
        <DetailView /> */}
      </main>
    </Router>
  );
}

export default App;
