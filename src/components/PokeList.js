import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import SearchBar from './SearchBar';
import './PokeList.scss';

const PokeList = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);

  const pokeListHtml = ctxPokedex.filteredPokemons.map((pkm) => {
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
        className={ctxPokedex.selectedPkm?.id === pkm.id ? "selected" : undefined}
      >
        <img src={pkm.sprites.versions['generation-vii'].icons.front_default} className="pokemon" alt="" />
        <div className="pokeOverview">
          <div name="pokeId" className="pokeId">{pokeId}</div>
          <div name="pokeName" className="pokeName">{pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
        </div>
      </li>
    )
  });

  return (
    <ol id="poke-list">
      <li><SearchBar searchBarID="poke-list-search-bar"/></li>
      {pokeListHtml}
    </ol>
  );
}

export default PokeList;
