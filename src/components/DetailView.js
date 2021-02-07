import React, { useContext, useEffect, useCallback, useState } from 'react';
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
import { fetchPokemons, fetchPkmData } from '../actions/apiCall';
import { getGenPokemonsById, getGenIndexById } from '../utils/PokemonUtil';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
import { ReactComponent as RightArrow } from '../resources/img/right-arrow.svg';
import { ReactComponent as BrailleDots } from '../resources/img/braille-pattern-dots.svg';
import { ReactComponent as ArrowDots } from '../resources/img/arrow-dots.svg';
import { ReactComponent as Times } from '../resources/img/times.svg';

const DetailView = ({ history, match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const [pkmSpecies, setPkmSpecies] = useState(null);
  const [pkmEvolution, setPkmEvolution] = useState(null);

  const id = Number(match.params.id);

  useEffect(() => {
    // TODO: Check if pokemonId is still within current gen before updating the gen
    dispatch({
      type: ACTION.SET_SELECTED_GEN_POKEMON,
      selectedGenPokemons: getGenPokemonsById(ctxPokedex.pokemons, id),
    });
    
    if (id <= ctxPokedex.pokemons.length) {
      fetchPkmData(id, setPkmSpecies, setPkmEvolution);
    }
  }, [ctxPokedex.pokemons, id]);

  const handleClickCancel = () => {
    history.push(`/gen/${getGenIndexById(id)}`);
  };

  const handleClickPrevPkm = () => {
    if (id > 1) {
      history.push(`/pokemon/${id - 1}`);
    }
  };

  const handleClickNextPkm = () => {
    if (id < ctxPokedex.pokemons.length) {
      history.push(`/pokemon/${id + 1}`);
    }
  };

  return (
    <>
      <PokeList activeId={id} />
      <div id="detail-view" style={{ backgroundColor: ColorUtil.getPrimaryTypeColor(ctxPokedex.pokemons[id - 1]) }}>
        <div id="overview">
          <div className="background-patterns">
            <img src={Pokeball} name="pokeball" alt="" />
            <BrailleDots />
            <ArrowDots />
            <button id="cancel-btn" name="cancel-btn" type="button" onClick={handleClickCancel}>
              <Times />
            </button>
          </div>
          <PokeBasicInfo pkm={ctxPokedex.pokemons[id - 1]} />
          <button id="previous-pokemon-btn" className="pokemon-detail-nav" type="button" onClick={handleClickPrevPkm}>
            <LeftArrow />
          </button>
          <button id="next-pokemon-btn" className="pokemon-detail-nav" type="button" onClick={handleClickNextPkm}>
            <RightArrow />
          </button>
        </div>
        <div id="detail-data">
          <PokeEntry pkmSpecies={pkmSpecies} />
          <Stat pkm={ctxPokedex.selectedPokemon} />
          <Evolution pokemons={ctxPokedex.pokemons} pkmEvolution={pkmEvolution} />
        </div>
      </div>
    </>
  )
}

DetailView.propTypes = {

}

export default DetailView;
