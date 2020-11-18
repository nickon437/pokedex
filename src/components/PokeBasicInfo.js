import React from 'react';

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
    pokeTypes.push(<div>{pkm.types[i].type.name.toUpperCase()}</div>);
  }

  return (
    <>
      <img src={pkm.sprites.other['official-artwork'].front_default} name="pokemon" alt={pkm.name}></img>
      <div name="basic-data">
        <div className="pokeId">{pokeId}</div>
        <div className="pokeName">{pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
        <div className="pokeTypes hflex">{pokeTypes}</div>
      </div>
    </>
  )
}

export default PokeBasicInfo;
