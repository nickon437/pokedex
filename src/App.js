import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PokedexContext } from './context/PokedexContext';
import CollectionPage from './pages/CollectionPage';
import DetailPage from './pages/DetailPage';
import GenerationsPage from './pages/GenerationsPage';
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
          <Route path='/' component={GenerationsPage} exact />
          <Route path='/pokedex' component={GenerationsPage} />
          <Route path='/gen/:id' component={CollectionPage} />
          <Route path='/pokemon/:id' component={DetailPage} />
        </main>
      )}
    </Router>
  );
};

export default App;
