import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import magnify from '../resources/img/magnify.png';
import './SearchBar.scss';

const SearchBar = ({ searchBarID }) => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);

  const handleChange = (e) => {
    const filteredPokemons = ctxPokedex.pokemons.filter((pokemon) => {
      const idRegex = new RegExp(`#?0*(${pokemon.id.toString()})`);
      return pokemon.name.includes(e.target.value) || e.target.value.match(idRegex)
    });
    setCtxPokedex((prev) => ({
      ...prev,
      filteredPokemons,
    }));
  };

  return (
    <div class="search-bar">
      <label htmlFor={searchBarID}>
        <img src={magnify} alt="search" />
      </label>
      <input id={searchBarID} name="search-input" type="search" placeholder="Search for ID and name" onChange={handleChange} />
    </div>
  )
}

export default SearchBar;
