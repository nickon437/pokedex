import React from 'react';
import ColorUtil from '../utils/ColorUtil';

const PokeBasicInfo = ({ pkm }) => {
  if (!pkm) {
    return <></>;
  }

  let zeros = '';
  for (let i = 0; i < 3 - pkm.id.toString().length; i++) {
    zeros += '0';
  }
  const pokeId = `#${zeros}${pkm.id}`;

  let pokeTypes = [];
  for (let i = 0; i < pkm.types.length; i++) {
    const pokemonType = pkm.types[i].type.name;
    pokeTypes.push(<div key={i} style={{ backgroundColor: ColorUtil.colorCode[pokemonType] }}>{pokemonType.toUpperCase()}</div>);

  }

  return (
    <>
      <img src={pkm.sprites.other['official-artwork'].front_default} className="pokemon" alt=""></img>
      <div className="basic-data">
        <div className="pokeId">{pokeId}</div>
        <div className="pokeName">{pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
        <div className="pokeTypes">{pokeTypes}</div>
      </div>
    </>
  )
}

export default PokeBasicInfo;
