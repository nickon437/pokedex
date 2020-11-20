
import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import PokeGridElement from './PokeGridElement';

const PokeGrid = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const pokeData = ctxPokedex.pokemons.map((pkm) => (<PokeGridElement key={pkm.id} pkm={pkm}/>));  
  return (
    <ol id="poke-grid">
      {pokeData}
    </ol>
  )
};

export default PokeGrid;
