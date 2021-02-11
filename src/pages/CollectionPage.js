import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
import '../styles/CollectionPage.scss';

const CollectionPage = ({ match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const { pokemons, genIndex, filteredPokemons } = ctxPokedex;
  const [cardsJsx, setCardJsx] = useState();
  const curGenIndex = match.params.id;

  useEffect(() => {
    setCardJsx(filteredPokemons.map((pkm) => <Card key={pkm.id} pkm={pkm} />));
  }, [filteredPokemons]);

  useEffect(() => {
    if (genIndex !== curGenIndex) {
      dispatch({
        type: ACTION.SET_SELECTED_GEN,
        payload: curGenIndex,
      });
    }
  }, [curGenIndex, pokemons]);

  return (
    <div id='poke-grid-container'>
      <Link to='/' name='back-btn' className='button unstyled'>
        <LeftArrow />
        GENERATIONS
      </Link>
      <SearchBar searchBarID='poke-grid-search-bar' />
      <ol id='poke-grid'>{cardsJsx}</ol>
    </div>
  );
};

export default CollectionPage;
