
import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import PokeGridElement from './PokeGridElement';
import SearchBar from './SearchBar';
import './PokeGrid.scss';

const PokeGrid = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const pokeData = ctxPokedex.filteredPokemons.map((pkm) => <PokeGridElement key={pkm.id} pkm={pkm} />);

  const handleClick = () => {
    setCtxPokedex((prev) => ({
      ...prev,
      class: {
        ...prev.class,
        generationView: true,
        pokemonListView: false,
      }
    }));
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
