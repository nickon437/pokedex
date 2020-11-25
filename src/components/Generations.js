import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import './Generations.scss';

const Generations = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const gens = [151, 251, 386, 493, 649, 721, 809, 898];

  const convertToRoman = (num) => {
    const roman = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
    let str = '';

    for (let i of Object.keys(roman)) {
      let q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }

    return str;
  }

  const handleClick = (genIndex, startPkmIndex) => {
    const selectedGenPokemons = ctxPokedex.pokemons.slice(startPkmIndex, gens[genIndex]);
    setCtxPokedex((prev) => ({
      ...prev,
      selectedGenPokemons,
      filteredPokemons: selectedGenPokemons,
    }));
  };

  const generationListJsx = gens.map((num, genIndex) => {
    const startPkmIndex = genIndex === 0 ? 0 : gens[genIndex - 1];
    
    // Stop generating generationListJsx for undefined pokemons
    if (startPkmIndex + 7 > ctxPokedex.pokemons.length) {
      return;
    }

    return (
      <div className="generation-box" onClick={() => handleClick(genIndex, startPkmIndex)}>
        <img src={ctxPokedex.pokemons[startPkmIndex]?.sprites.other['official-artwork'].front_default} alt="" />
        <img src={ctxPokedex.pokemons[startPkmIndex + 3]?.sprites.other['official-artwork'].front_default} alt="" />
        <img src={ctxPokedex.pokemons[startPkmIndex + 6]?.sprites.other['official-artwork'].front_default} alt="" />
        <div className="generation-heading">GENERATION {convertToRoman(genIndex + 1)}</div>
      </div>
    )
  });

  return (
    <div id="generations-section">
      {generationListJsx}
    </div>
  )
}

export default Generations;
