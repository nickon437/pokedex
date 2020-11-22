import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import SearchBar from './SearchBar';

const PokeList = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);

  const pokeListHtml = ctxPokedex.pokemons.map((pkm) => {
    let zeros = '';
    for (let i = 0; i < 3 - pkm.id.toString().length; i++) {
      zeros += '0';
    }
    const pokeId = `#${zeros}${pkm.id}`;

    const handleClickItem = () => setCtxPokedex((prev) => ({
      ...prev,
      selectedPkm: pkm,
    }));

    return (
      <li
        name="info-container"
        key={pkm.id}
        onClick={handleClickItem}
        className={[ctxPokedex.selectedPkm?.id === pkm.id && "selected", "hflex"].join(' ')}
      >
        <img src={pkm.sprites.versions['generation-vii'].icons.front_default} name="pokemon" alt="" />
        <div className="pokeOverview hflex">
          <div name="pokeId" className="pokeId">{pokeId}</div>
          <div name="pokeName" className="pokeName">{pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
        </div>
      </li>
    )
  });

  return (
    <ol id="poke-list" className="vflex">
      <li><SearchBar /></li>
      {pokeListHtml}
    </ol>
  );
}

export default PokeList;
