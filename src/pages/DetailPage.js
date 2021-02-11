import React, { useContext, useEffect, useState } from 'react';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import { Link } from 'react-router-dom';
import Stat from '../components/Stat';
import BasicInfo from '../components/BasicInfo';
import Evolution from '../components/Evolution';
import Entry from '../components/Entry';
import SideList from '../components/SideList';
import { fetchPkmData } from '../helpers/apiHelper';
import { getPrimaryTypeColor } from '../helpers/colorHelper';
import { getGenPokemonsById, getGenIndexById } from '../helpers/pokemonHelper';
import Pokeball from '../resources/img/pokeball.svg';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
import { ReactComponent as RightArrow } from '../resources/img/right-arrow.svg';
import { ReactComponent as BrailleDots } from '../resources/img/braille-pattern-dots.svg';
import { ReactComponent as ArrowDots } from '../resources/img/arrow-dots.svg';
import { ReactComponent as Times } from '../resources/img/times.svg';
import '../styles/DetailPage.scss';

const DetailPage = ({ match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const [pkmSpecies, setPkmSpecies] = useState(null);
  const [pkmEvolution, setPkmEvolution] = useState(null);

  const { pokemons, selectedGenPokemons } = ctxPokedex;
  const id = Number(match.params.id);
  const curPokemon = pokemons[id - 1];

  useEffect(() => {
    const root = document.querySelector('#root');

    if (!selectedGenPokemons.includes(curPokemon)) {
      dispatch({
        type: ACTION.SET_SELECTED_GEN,
        payload: getGenPokemonsById(pokemons, id),
      });
    }

    if (id <= pokemons.length) {
      fetchPkmData(id, setPkmSpecies, setPkmEvolution);
      root.style.backgroundColor = getPrimaryTypeColor(curPokemon);
    }

    return () => {
      root.style.backgroundColor = null;
    };
  }, [pokemons, id]);

  return (
    <>
      <SideList activeId={id} />
      <div
        id='detail-view'
        style={{ backgroundColor: getPrimaryTypeColor(curPokemon) }}
      >
        <div id='overview'>
          <div className='background-patterns'>
            <img src={Pokeball} name='pokeball' alt='' aria-hidden='true' />
            <BrailleDots aria-hidden='true' />
            <ArrowDots aria-hidden='true' />
            <Link
              to={`/gen/${getGenIndexById(id)}`}
              name='close-btn'
              className='button'
            >
              <Times />
            </Link>
          </div>
          <BasicInfo pkm={curPokemon} />
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
        {pkmSpecies && pkmEvolution && (
          <div id='detail-data'>
            <Entry pkmSpecies={pkmSpecies} />
            <Stat pkm={curPokemon} />
            <Evolution pokemons={pokemons} pkmEvolution={pkmEvolution} />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
