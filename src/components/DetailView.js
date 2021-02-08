import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';
import PokeBasicInfo from './PokeBasicInfo';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import Pokeball from '../resources/img/pokeball.svg';
import './DetailView.scss';
import Evolution from './Evolution';
import ColorUtil from '../utils/ColorUtil';
import PokeEntry from './PokeEntry';
import PokeList from './PokeList';
import { fetchPkmData } from '../actions/apiCall';
import { getGenPokemonsById, getGenIndexById } from '../utils/PokemonUtil';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
import { ReactComponent as RightArrow } from '../resources/img/right-arrow.svg';
import { ReactComponent as BrailleDots } from '../resources/img/braille-pattern-dots.svg';
import { ReactComponent as ArrowDots } from '../resources/img/arrow-dots.svg';
import { ReactComponent as Times } from '../resources/img/times.svg';
import { Link } from 'react-router-dom';

const DetailView = ({ match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const [pkmSpecies, setPkmSpecies] = useState(null);
  const [pkmEvolution, setPkmEvolution] = useState(null);

  const { pokemons, selectedGenPokemons } = ctxPokedex;
  const id = Number(match.params.id);
  const curPokemon = pokemons[id - 1];

  useEffect(() => {
    if (!selectedGenPokemons.includes(curPokemon)) {
      dispatch({
        type: ACTION.SET_SELECTED_GEN_POKEMON,
        payload: getGenPokemonsById(pokemons, id),
      });
    }

    if (id <= pokemons.length) {
      fetchPkmData(id, setPkmSpecies, setPkmEvolution);
      document.querySelector(
        '#root'
      ).style.backgroundColor = ColorUtil.getPrimaryTypeColor(curPokemon);
    }

    return () => {
      document.querySelector('#root').style.backgroundColor = null;
    };
  }, [pokemons, id]);

  return (
    <>
      <PokeList activeId={id} />
      <div
        id='detail-view'
        style={{ backgroundColor: ColorUtil.getPrimaryTypeColor(curPokemon) }}
      >
        <div id='overview'>
          <div className='background-patterns'>
            <img src={Pokeball} name='pokeball' alt='' />
            <BrailleDots />
            <ArrowDots />
            <Link
              to={`/gen/${getGenIndexById(id)}`}
              name='close-btn'
              className='button'
            >
              <Times />
            </Link>
          </div>
          <PokeBasicInfo pkm={curPokemon} />
          <Link
            to={`/pokemon/${id - 1}`}
            id='previous-pokemon-btn'
            className='button pokemon-detail-nav'
            style={{ visibility: id <= 1 ? 'hidden' : 'visible' }}
          >
            <LeftArrow />
          </Link>
          <Link
            to={`/pokemon/${id + 1}`}
            id='next-pokemon-btn'
            className='button pokemon-detail-nav'
            style={{ visibility: id >= pokemons.length ? 'hidden' : 'visible' }}
          >
            <RightArrow />
          </Link>
        </div>
        <div id='detail-data'>
          <PokeEntry pkmSpecies={pkmSpecies} />
          <Stat pkm={curPokemon} />
          <Evolution pokemons={pokemons} pkmEvolution={pkmEvolution} />
        </div>
      </div>
    </>
  );
};

DetailView.propTypes = {};

export default DetailView;
