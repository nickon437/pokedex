import React from 'react';
import ColorUtil from '../utils/ColorUtil';
import StringUtil from '../utils/StringUtil';
import { getFrontSprite } from '../utils/PokemonUtil';

const PokeBasicInfo = ({ pkm }) => {
  if (!pkm) {
    return <></>;
  }

  let pokeTypes = [];
  for (let i = 0; i < pkm.types.length; i++) {
    const pokemonType = pkm.types[i].type.name;
    pokeTypes.push(<div key={i} style={{ backgroundColor: ColorUtil.colorCode[pokemonType] }}>{pokemonType.toUpperCase()}</div>);
  }

  return (
    <>
      <div className="basic-data">
        <div className="pokeId">{StringUtil.formatPokemonId(pkm.id)}</div>
        <div className="pokeName">{StringUtil.makeFirstLetterUpperCase(pkm.name)}</div>
        <div className="pokeTypes">{pokeTypes}</div>
      </div>
      <img src={getFrontSprite(pkm)} className="pokemon" alt=""></img>
    </>
  )
}

export default PokeBasicInfo;
