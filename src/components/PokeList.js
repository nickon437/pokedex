import React, { useContext } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import SearchBar from './SearchBar';
import './PokeList.scss';
import StringUtil from '../utils/StringUtil';

const PokeList = () => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);

  const pokeListHtml = ctxPokedex.filteredPokemons.map((pkm) => {
    const handleClickItem = () => {
      dispatch({ type: ACTION.SHOW_DETAIL_VIEW, selectedPokemon: pkm });
    };

    return (
      <li
        name="info-container"
        key={pkm.id}
        onClick={handleClickItem}
        className={ctxPokedex.selectedPokemon?.id === pkm.id ? "selected" : undefined}
      >
        <img src={pkm.sprites.versions['generation-vii'].icons.front_default} className="pokemon" alt="" />
        <div className="pokeOverview">
          <div name="pokeId" className="pokeId">{StringUtil.formatPokemonId(pkm.id)}</div>
          <div name="pokeName" className="pokeName">{StringUtil.makeFirstLetterUpperCase(pkm.name)}</div>
        </div>
      </li>
    )
  });

  return (
    <ol id="poke-list">
      <li><SearchBar searchBarID="poke-list-search-bar" /></li>
      {pokeListHtml}
    </ol>
  );
}

export default PokeList;
