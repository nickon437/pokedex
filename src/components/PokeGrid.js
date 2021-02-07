import React, { useContext, useEffect } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import PokeGridElement from './PokeGridElement';
import SearchBar from './SearchBar';
import { fetchPokemons } from '../actions/apiCall';
import { getPokemonsByGenIndex } from '../utils/PokemonUtil';
import './PokeGrid.scss';

const PokeGrid = ({ history, match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const pokeData = ctxPokedex.filteredPokemons.map((pkm) => <PokeGridElement key={pkm.id} pkm={pkm} />);

  useEffect(() => {
    const genIndex = match.params.id;
    dispatch({
      type: ACTION.SET_SELECTED_GEN_POKEMON,
      selectedGenPokemons: getPokemonsByGenIndex(ctxPokedex.pokemons, genIndex),
    });
  }, [match.params.id, ctxPokedex.pokemons]);

  useEffect(() => {
    if (ctxPokedex.pokemons.length === 0) {
      fetchPokemons(dispatch);
    }
  }, []);

  const handleClick = () => {
    dispatch({ type: ACTION.BACK_TO_GENERATION_VIEW });
    history.push('/');
  }

  return (
    <div id="poke-grid-container">
      <button type="button" name="back-btn" onClick={handleClick}>
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
        GENERATIONS
      </button>
      <SearchBar searchBarID="poke-grid-search-bar" />
      <ol id="poke-grid">
        {pokeData}
      </ol>
    </div>
  )
};

export default PokeGrid;
