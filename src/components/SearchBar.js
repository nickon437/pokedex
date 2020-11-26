import React, { useContext, useRef } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import magnify from '../resources/img/magnify.png';
import './SearchBar.scss';

const SearchBar = ({ searchBarID }) => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const searchBarRef = useRef(null);

  const handleChange = (e) => {
    const filteredPokemons = ctxPokedex.selectedGenPokemons.filter((pokemon) => {
      const idRegex = new RegExp(`#?0*(${pokemon.id.toString()})`);
      return pokemon.name.includes(e.target.value) || e.target.value.match(idRegex)
    });
    setCtxPokedex((prev) => ({
      ...prev,
      filteredPokemons,
      searchKeyword: e.target.value,
    }));
  };

  if (searchBarRef.current && searchBarRef.current.value !== ctxPokedex.searchKeyword) {
    searchBarRef.current.value = ctxPokedex.searchKeyword;
  }
  
  return (
    <div className="search-bar">
      <label htmlFor={searchBarID}>
        <img src={magnify} alt="search" />
      </label>
      <input ref={searchBarRef} id={searchBarID} name="search-input" type="search" placeholder="Search for ID and name" onChange={handleChange} />
    </div>
  )
}

export default SearchBar;
