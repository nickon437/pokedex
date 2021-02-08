import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import PokeGridElement from '../components/PokeGridElement';
import SearchBar from '../components/SearchBar';
import { getPokemonsByGenIndex } from '../helpers/pokemonHelper';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
import '../styles/PokeGrid.scss';

const PokeGrid = ({ match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const { pokemons } = ctxPokedex;
  const genIndex = match.params.id;

  const pokeData = ctxPokedex.filteredPokemons.map((pkm) => (
    <PokeGridElement key={pkm.id} pkm={pkm} />
  ));

  useEffect(() => {
    dispatch({
      type: ACTION.SET_SELECTED_GEN_POKEMON,
      payload: getPokemonsByGenIndex(pokemons, genIndex),
    });
  }, [genIndex, pokemons]);

  return (
    <div id='poke-grid-container'>
      <Link to='/' name='back-btn' className='button unstyled'>
        <LeftArrow />
        GENERATIONS
      </Link>
      <SearchBar searchBarID='poke-grid-search-bar' />
      <ol id='poke-grid'>{pokeData}</ol>
    </div>
  );
};

export default PokeGrid;
