
import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import PokeGridElement from './PokeGridElement';
import SearchBar from './SearchBar';
import './PokeGrid.scss';

const PokeGrid = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const pokeData = ctxPokedex.filteredPokemons.map((pkm) => <PokeGridElement key={pkm.id} pkm={pkm}/>);  
  return (
    <div id="poke-grid-container">
      <SearchBar />
      <ol id="poke-grid">
        {pokeData}
      </ol>
    </div>
  )
};

export default PokeGrid;
