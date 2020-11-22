import React from 'react';
import magnify from '../resources/img/magnify.png';

const SearchBar = () => {
  return (
    <div class="search-bar">
      <img src={magnify} alt="" />
      <input name="search" type="search" placeholder="Search for ID and name" />
    </div>
  )
}

export default SearchBar;
