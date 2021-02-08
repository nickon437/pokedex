import React, { useContext, useRef } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import magnify from '../resources/img/magnify.png';
import '../styles/SearchBar.scss';

const SearchBar = ({ searchBarID }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const { selectedGenPokemons, searchKeyword } = ctxPokedex
  const searchBarRef = useRef(null);

  const handleChange = (e) => {
    const filteredPokemons = selectedGenPokemons.filter((pokemon) => {
      const idRegex = new RegExp(`#?0*(${pokemon.id.toString()})`);
      return pokemon.name.includes(e.target.value) || e.target.value.match(idRegex)
    });

    dispatch({
      type: ACTION.SET_FILTERED_POKEMONS,
      payload: {
        filteredPokemons,
        searchKeyword: e.target.value,
      }
    });
  };

  if (searchBarRef.current && searchBarRef.current.value !== searchKeyword) {
    searchBarRef.current.value = searchKeyword;
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
