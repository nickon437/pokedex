import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PokedexContext } from './context/PokedexContext';
import PokeGrid from './pages/PokeGrid';
import DetailView from './pages/DetailView';
import Generations from './pages/Generations';
import Loader from './components/Loader';
import { fetchPokemons } from './helpers/apiHelper';
import './App.scss';

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
