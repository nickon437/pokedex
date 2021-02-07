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
import axios from 'axios';
import PokeList from './PokeList';
import { fetchPokemons } from '../actions/apiCall';
import { getGenPokemonsById, getGenIndexById } from '../utils/PokemonUtil';
import { ReactComponent as LeftArrow } from '../resources/img/left-arrow.svg';
import { ReactComponent as RightArrow } from '../resources/img/right-arrow.svg';
import { ReactComponent as BrailleDots } from '../resources/img/braille-pattern-dots.svg';
import { ReactComponent as ArrowDots } from '../resources/img/arrow-dots.svg';
import { ReactComponent as Times } from '../resources/img/times.svg';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DetailView = ({ history, match }) => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const [pkmSpecies, setPkmSpecies] = useState(null);
  const [pkmEvolution, setPkmEvolution] = useState(null);

  const fetchPkmData = useCallback(async (selectedPokemon) => {
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`;
    const pokemonSpecies = await axios
      .get(pokemonSpeciesUrl)
      .then((res) => res.data);
    setPkmSpecies(pokemonSpecies);

    const evolutionUrl = pokemonSpecies.evolution_chain.url;
    setPkmEvolution(await axios.get(evolutionUrl).then((res) => res.data));
  }, []);

  useEffect(() => {
    if (ctxPokedex.selectedPokemon) {
      fetchPkmData(ctxPokedex.selectedPokemon);
    }
  }, [ctxPokedex.selectedPokemon]);

  useEffect(() => {
    if (ctxPokedex.pokemons.length === 0) {
      fetchPokemons(dispatch);
    }
  }, []);

  useEffect(() => {
    // TODO: Check if pokemonId is still within current gen before updating the gen
    dispatch({
      type: ACTION.SET_SELECTED_GEN_POKEMON,
      selectedGenPokemons: getGenPokemonsById(ctxPokedex.pokemons, match.params.id),
    });
    
    dispatch({
      type: ACTION.SHOW_DETAIL_VIEW,
      selectedPokemon: ctxPokedex.pokemons[match.params.id - 1],
    });
  }, [ctxPokedex.pokemons, match.params.id]);

  const handleClickCancel = async () => {
    dispatch({ type: ACTION.TRANSITION_CLOSE_DETAIL_VIEW });
    document.querySelector('main').style.backgroundColor = null; // TODO: Remove this later

    await sleep(1000);

    dispatch({ type: ACTION.COMPLETE_TRANSITION_CLOSE_DETAIL_VIEW });

    history.push(`/gen/${getGenIndexById(match.params.id)}`);
  };

  const handleClickPrevPkm = () => {
    const pokemonIndex = ctxPokedex.selectedPokemon.id - 1;
    if (pokemonIndex > 0) {
      const prevPkm = ctxPokedex.pokemons[pokemonIndex - 1];
      dispatch({ type: ACTION.SHOW_DETAIL_VIEW, selectedPokemon: prevPkm });
    }
  };

  const handleClickNextPkm = () => {
    const pokemonIndex = ctxPokedex.selectedPokemon.id - 1;
    if (pokemonIndex < ctxPokedex.pokemons.length - 1) {
      const nextPkm = ctxPokedex.pokemons[pokemonIndex + 1];
      dispatch({ type: ACTION.SHOW_DETAIL_VIEW, selectedPokemon: nextPkm });
    }
  };

  return (
    <>
      <PokeList />
      <div id="detail-view" style={{ backgroundColor: ColorUtil.getPrimaryTypeColor(ctxPokedex.selectedPokemon) }}>
        <div id="overview">
          <div className="background-patterns">
            <img src={Pokeball} name="pokeball" alt="" />
            <BrailleDots />
            <ArrowDots />
            <button id="cancel-btn" name="cancel-btn" type="button" onClick={handleClickCancel}>
              <Times />
            </button>
          </div>
          <PokeBasicInfo pkm={ctxPokedex.selectedPokemon} />
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
