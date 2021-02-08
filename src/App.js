import React, { useContext, useEffect } from 'react';
import './App.scss';
import { PokedexContext } from './context/PokedexContext';
import PokeGrid from './components/PokeGrid';
import DetailView from './components/DetailView';
import Generations from './components/Generations';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchPokemons } from './actions/apiCall';
import Loader from './components/Loader';

const App = () => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);

  useEffect(() => {
    fetchPokemons(dispatch);
  }, []);

  return (
    <Router>
      <header>
        <div>POKEDEX</div>
      </header>
      {ctxPokedex.isLoadingPage ? (
        <Loader />
      ) : (
        <main>
          <Route path='/' component={Generations} exact />
          <Route path='/pokedex' component={Generations} />
          <Route path='/gen/:id' component={PokeGrid} />
          <Route path='/pokemon/:id' component={DetailView} />
        </main>
      )}
    </Router>
  );
};

export default App;
