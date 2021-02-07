import React, { useContext, useEffect } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import PokeGridElement from './PokeGridElement';
import SearchBar from './SearchBar';
import { fetchPokemons } from '../actions/apiCall';
import { getPokemonsByGenIndex } from '../utils/PokemonUtil';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
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

  const handleClick = () => {
    dispatch({ type: ACTION.BACK_TO_GENERATION_VIEW });
    history.push('/');
  }

  return (
    <div id="poke-grid-container">
      <button type="button" name="back-btn" onClick={handleClick}>
        <LeftArrow />GENERATIONS
      </button>
      <SearchBar searchBarID="poke-grid-search-bar" />
      <ol id="poke-grid">
        {pokeData}
      </ol>
    </div>
  )
};

export default PokeGrid;
