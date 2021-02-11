import React, { useEffect, useState } from 'react';
import { colorCode } from '../helpers/colorHelper';
import { formatPkmId, makeFirstLetterUpperCase } from '../helpers/stringHelper';
import { getFrontSprite } from '../helpers/pokemonHelper';

const BasicInfo = ({ pkm }) => {
  const [pkmTypesJsx, setPkmTypesJsx] = useState([]);

  useEffect(() => {
    const newPkmTypesJsx = [];
    for (let i = 0; i < pkm.types.length; i++) {
      const pkmType = pkm.types[i].type.name;
      newPkmTypesJsx.push(
        <div key={i} style={{ backgroundColor: colorCode[pkmType] }}>
          {pkmType.toUpperCase()}
        </div>
      );
    }
    setPkmTypesJsx(newPkmTypesJsx);
  }, [pkm]);

  return (
    <>
      <div className='basic-data'>
        <div className='pkmId'>{formatPkmId(pkm.id)}</div>
        <div className='pokeName'>{makeFirstLetterUpperCase(pkm.name)}</div>
        <div className='pokeTypes'>{pkmTypesJsx}</div>
      </div>
      <img src={getFrontSprite(pkm)} className='pokemon' alt=''></img>
    </>
  );
};

export default BasicInfo;
