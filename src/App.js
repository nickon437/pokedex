// import logo from './logo.svg';
// import './App.css';

// function App() {
//   console.log('a');
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useCallback, useContext, useEffect } from 'react';
import './App.css';
import { PokedexContext } from './context/PokedexContext';
import PokeGrid from './components/PokeGrid';
import PokeList from './components/PokeList';
import DetailView from './components/DetailView';

const App = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  // console.log('a');
  // const fetchPokemon = async () => {
  //   const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  //   const NUM_OF_POKEMON = 3;
  //   const promises = [];
  //   for (let i = 1; i <= NUM_OF_POKEMON; i++) {
  //     const pokemonUrl = BASE_URL + i;
  //     promises.push(fetch(pokemonUrl).then((result) => result.json()));
  //   }
  //   pokemons = await Promise.all(promises);
  //   console.log('app', pokemons);
  // };
  // console.log('b');

  // fetchPokemon();
  // console.log('c')


  const fetchPokemon = useCallback(async () => {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const NUM_OF_POKEMON = 30;
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
    console.log('app', pokemons);
  }, [])

  useEffect(() => {
    console.log('useEffect');
    fetchPokemon();
  }, [fetchPokemon]);


  return (
    <div id="main" className={[ ctxPokedex.class.splitView && "split-view", ctxPokedex.class.reverseSplitView && "reverse-split-view" ].join(' ') }>
      <PokeGrid />
      <PokeList />
      <DetailView />
    </div>
  );
}

export default App;
