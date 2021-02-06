import React, { useContext } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import './Generations.scss';
import Pokeball from '../resources/img/pokeball.svg';
import StringUtil from '../utils/StringUtil';
import Loader from './Loader';

const Generations = ({ history }) => { // TODO: Check to see if we can avoid pushing manually
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const gens = [151, 251, 386, 493, 649, 721, 809, 898];

  const handleClick = (genIndex, startPkmIndex) => {
    const selectedGenPokemons = ctxPokedex.pokemons.slice(startPkmIndex, gens[genIndex]);
    dispatch({ type: ACTION.SET_SELECTED_GEN_POKEMON, selectedGenPokemons });
    history.push(`/gen/${genIndex + 1}`);
  };

  const generationListJsx = gens.map((num, genIndex) => {
    const startPkmIndex = genIndex === 0 ? 0 : gens[genIndex - 1];

    // Stop generating generationListJsx for undefined pokemons
    if (startPkmIndex + 7 > ctxPokedex.pokemons.length) {
      return null;
    }

    return (
      <div className="generation-box" onClick={() => handleClick(genIndex, startPkmIndex)} key={genIndex}>
        <div className="background-patterns" name="background-patterns">
          <img src={Pokeball} name="pokeball" alt="" />
          <svg name="dots-1" viewBox="0 0 45.767 45.767">
            <path d="M11.965,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0    c0,2.434-1.968,4.393-4.393,4.393l0,0C13.933,45.73,11.965,43.77,11.965,41.336z M11.965,29.034c0-2.425,1.968-4.393,4.393-4.393    l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.968,4.393-4.393,4.393l0,0C13.933,33.428,11.965,31.46,11.965,29.034z     M11.965,16.733c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.434-1.968,4.393-4.393,4.393l0,0    C13.933,21.126,11.965,19.167,11.965,16.733z" />
            <path d="M24.478,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0    c0,2.434-1.968,4.393-4.393,4.393l0,0C26.446,45.73,24.478,43.77,24.478,41.336z M24.478,29.034c0-2.425,1.968-4.393,4.393-4.393    l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.968,4.393-4.393,4.393l0,0C26.446,33.428,24.478,31.46,24.478,29.034z     M24.478,16.733c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.434-1.968,4.393-4.393,4.393l0,0    C26.446,21.126,24.478,19.167,24.478,16.733z M24.478,4.431c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393    l0,0c0,2.425-1.968,4.393-4.393,4.393l0,0C26.446,8.825,24.478,6.856,24.478,4.431z" />
            <path d="M36.981,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0c2.434,0,4.393,1.968,4.393,4.393l0,0    c0,2.425-1.959,4.393-4.393,4.393l0,0C38.95,45.73,36.981,43.762,36.981,41.336z M0,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0    c2.434,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.959,4.393-4.393,4.393l0,0C1.968,45.73,0,43.762,0,41.336z M36.981,29.034    c0-2.425,1.968-4.393,4.393-4.393l0,0c2.434,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.959,4.393-4.393,4.393l0,0    C38.95,33.428,36.981,31.46,36.981,29.034z" />
          </svg>
        </div>
        <img className="starter-1" src={ctxPokedex.pokemons[startPkmIndex]?.sprites.other['official-artwork'].front_default} alt="" />
        <img className="starter-2" src={ctxPokedex.pokemons[startPkmIndex + 3]?.sprites.other['official-artwork'].front_default} alt="" />
        <img className="starter-3" src={ctxPokedex.pokemons[startPkmIndex + 6]?.sprites.other['official-artwork'].front_default} alt="" />
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
