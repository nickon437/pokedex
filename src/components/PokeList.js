import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PokedexContext } from '../context/PokedexContext';
import SearchBar from './SearchBar';
import { formatPokemonId, makeFirstLetterUpperCase } from '../helpers/stringHelper';
import { getFrontIcon } from '../helpers/pokemonHelper';
import '../styles/PokeList.scss';

const PokeList = ({ activeId }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);

  const pokeListHtml = ctxPokedex.filteredPokemons.map((pkm) => (
    <li
      name={pkm.name}
      key={pkm.id}
      className={activeId === pkm.id ? "selected" : undefined}
    >
      <Link to={`/pokemon/${pkm.id}`} className="unstyled">
        <img src={getFrontIcon(pkm)} className="pokemon" alt="" />
        <div className="pokeOverview">
          <div name="pokeId" className="pokeId">{formatPokemonId(pkm.id)}</div>
          <div name="pokeName" className="pokeName">{makeFirstLetterUpperCase(pkm.name)}</div>
        </div>
      </Link>
    </li>
  ));

  return (
    <ol id="poke-list">
      <li><SearchBar searchBarID="poke-list-search-bar" /></li>
      {pokeListHtml}
    </ol>
  );
}

export default withRouter(PokeList);
