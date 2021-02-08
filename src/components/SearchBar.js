import React, { useContext, useRef } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import magnify from '../resources/img/magnify.png';
import '../styles/SearchBar.scss';

const SearchBar = ({ searchBarID }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const { searchInput } = ctxPokedex;
  const searchBarRef = useRef(null);

  const handleChange = (e) => {
    const searchInput = e.target.value;

    dispatch({
      type: ACTION.SET_FILTERED_POKEMONS,
      payload: searchInput,
    });
  };

  if (searchBarRef.current && searchBarRef.current.value !== searchInput) {
    searchBarRef.current.value = searchInput;
  }

  return (
    <div className='search-bar'>
      <label htmlFor={searchBarID}>
        <img src={magnify} alt='search' />
      </label>
      <input
        ref={searchBarRef}
        id={searchBarID}
        name='search-input'
        type='search'
        placeholder='Search for ID and name'
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
