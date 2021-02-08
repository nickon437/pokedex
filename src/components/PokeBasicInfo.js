import React from 'react';
import { colorCode } from '../helpers/colorHelper';
import { formatPokemonId, makeFirstLetterUpperCase } from '../helpers/stringHelper';
import { getFrontSprite } from '../helpers/pokemonHelper';

const PokeBasicInfo = ({ pkm }) => {
  if (!pkm) {
    return <></>;
  }

  let pokeTypes = [];
  for (let i = 0; i < pkm.types.length; i++) {
    const pokemonType = pkm.types[i].type.name;
    pokeTypes.push(<div key={i} style={{ backgroundColor: colorCode[pokemonType] }}>{pokemonType.toUpperCase()}</div>);
  }

  return (
    <>
      <div className="basic-data">
        <div className="pokeId">{formatPokemonId(pkm.id)}</div>
        <div className="pokeName">{makeFirstLetterUpperCase(pkm.name)}</div>
        <div className="pokeTypes">{pokeTypes}</div>
      </div>
      <img src={getFrontSprite(pkm)} className="pokemon" alt=""></img>
    </>
  )
}

export default PokeBasicInfo;
