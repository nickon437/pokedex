import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import './Generations.scss';
import Pokeball from '../resources/img/pokeball.svg';
import StringUtil from '../utils/StringUtil';
import Loader from './Loader';
import { ReactComponent as Dots1 } from '../resources/img/dots.svg';
import { getFrontSprite } from '../utils/PokemonUtil';

const Generations = ({ history }) => { // TODO: Check to see if we can avoid pushing manually
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const gens = [151, 251, 386, 493, 649, 721, 809, 898];

  const handleClick = (genIndex) => {
    history.push(`/gen/${genIndex}`);
  };

  const generationListJsx = gens.map((num, genIndex) => {
    const startPkmIndex = genIndex === 0 ? 0 : gens[genIndex - 1];
    const startPkmId = startPkmIndex + 1;

    // Stop generating generationListJsx for undefined pokemons
    if (startPkmId + 6 > ctxPokedex.pokemons.length) {
      return null;
    }

    return (
      <div className="generation-box" onClick={() => handleClick(genIndex)} key={genIndex}>
        <div className="background-patterns" name="background-patterns">
          <img src={Pokeball} name="pokeball" alt="" />
          <Dots1 />
        </div>
        <img className="starter-1" src={getFrontSprite(ctxPokedex.pokemons, startPkmId)} alt="" />
        <img className="starter-2" src={getFrontSprite(ctxPokedex.pokemons, startPkmId + 3)} alt="" />
        <img className="starter-3" src={getFrontSprite(ctxPokedex.pokemons, startPkmId + 6)} alt="" />
        <div className="generation-heading">GENERATION {StringUtil.convertToRoman(genIndex + 1)}</div>
      </div>
    )
  });

  return (
    ctxPokedex.class.mainView === 'loading-view' // TODO: Change this to checking if all pokemons are laoded
    ? <Loader /> 
    : <div id="generations-section">{generationListJsx}</div>
  )
}

export default Generations;
