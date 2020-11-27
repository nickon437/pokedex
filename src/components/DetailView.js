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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DetailView = () => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const [pkmSpecies, setPkmSpecies] = useState(null);
  const [pkmEvolution, setPkmEvolution] = useState(null);

  const fetchPkmData = useCallback(async (selectedPokemon) => {
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`;
    const pokemonSpecies = await fetch(pokemonSpeciesUrl).then((result) => result.json());
    setPkmSpecies(pokemonSpecies);

    const evolutionUrl = pokemonSpecies.evolution_chain.url;
    setPkmEvolution(await fetch(evolutionUrl).then((result) => result.json()));
  }, []);

  useEffect(() => {
    if (ctxPokedex.selectedPokemon) {
      fetchPkmData(ctxPokedex.selectedPokemon);
    }
  }, [ctxPokedex.selectedPokemon]);

  const handleClickCancel = async () => {
    dispatch({ type: ACTION.TRANSITION_CLOSE_DETAIL_VIEW });
    document.getElementById('main').style.backgroundColor = null;

    await sleep(1000);

    dispatch({ type: ACTION.COMPLETE_TRANSITION_CLOSE_DETAIL_VIEW })
  };

  const handleClickPrevPkm = () => {
    const pokemonIndex = ctxPokedex.selectedPokemon.id - 1;
    if (pokemonIndex > 0) {
      const prevPkm = ctxPokedex.pokemons[pokemonIndex - 1];  
      dispatch({ type: ACTION.SHOW_DETAIL_VIEW, selectedPokemon: prevPkm });
    }
  }
  
  const handleClickNextPkm = () => {
    const pokemonIndex = ctxPokedex.selectedPokemon.id - 1;
    if (pokemonIndex < ctxPokedex.pokemons.length - 1) {
      const nextPkm = ctxPokedex.pokemons[pokemonIndex + 1];  
      dispatch({ type: ACTION.SHOW_DETAIL_VIEW, selectedPokemon: nextPkm });
    }
  }

  return (
    <div id="detail-view" style={{ backgroundColor: ColorUtil.getPrimaryTypeColor(ctxPokedex.selectedPokemon) }}>
      <div id="overview">
        <button id="previous-pokemon-btn" className="pokemon-detail-nav" type="button" onClick={handleClickPrevPkm}>
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
        </button>
        <button id="next-pokemon-btn" className="pokemon-detail-nav" type="button" onClick={handleClickNextPkm}>
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
        </button>
        <div className="background-patterns">
          <img src={Pokeball} name="pokeball" alt="" />
          <svg width="154" height="215" name="dots-1"><circle cx="46" cy="108" r="15" /><circle cx="108" cy="108" r="15" /><circle cx="46" cy="169" r="15" /><circle cx="108" cy="169" r="15" /><line x1="46" y1="46" x2="108" y2="46" stroke="currentColor" strokeWidth="30" strokeLinecap="round" /></svg>
          <svg x="0px" y="0px" viewBox="0 0 297.613 297.613" name="dots-2"><g><circle cx="15.279" cy="14.83" r="14.83" /><circle cx="59.32" cy="59.769" r="14.83" /><circle cx="59.32" cy="14.83" r="14.83" /><circle cx="104.261" cy="59.769" r="14.83" /><circle cx="104.261" cy="103.81" r="14.83" /><circle cx="104.261" cy="14.83" r="14.83" /><circle cx="148.302" cy="59.769" r="14.83" /><circle cx="148.302" cy="103.81" r="14.83" /><circle cx="148.302" cy="14.83" r="14.83" /><circle cx="192.343" cy="59.769" r="14.83" /><circle cx="192.343" cy="103.81" r="14.83" /><circle cx="148.302" cy="147.852" r="14.83" /><circle cx="192.343" cy="147.852" r="14.83" /><circle cx="104.261" cy="192.79" r="14.831" /><circle cx="148.302" cy="192.79" r="14.831" /><circle cx="192.343" cy="192.79" r="14.831" /><circle cx="59.32" cy="236.887" r="14.83" /><circle cx="104.261" cy="236.887" r="14.83" /><circle cx="148.302" cy="236.887" r="14.83" /><circle cx="192.343" cy="236.887" r="14.83" /><circle cx="238.238" cy="103.81" r="14.83" /><circle cx="238.238" cy="147.852" r="14.83" /><circle cx="238.238" cy="192.79" r="14.831" /><circle cx="15.279" cy="282.782" r="14.831" /><circle cx="59.32" cy="282.782" r="14.831" /><circle cx="104.261" cy="282.782" r="14.831" /><circle cx="148.302" cy="282.782" r="14.831" /><circle cx="282.334" cy="147.852" r="14.83" /></g></svg>
          <button id="cancel-btn" name="cancel-btn" type="button" onClick={handleClickCancel}>
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
          </button>
        </div>
        <PokeBasicInfo pkm={ctxPokedex.selectedPokemon} />
      </div>
      <div id="detail-data">
        <PokeEntry pkmSpecies={pkmSpecies} />
        <Stat pkm={ctxPokedex.selectedPokemon} />
        <Evolution pokemons={ctxPokedex.pokemons} pkmEvolution={pkmEvolution} />
      </div>
    </div>
  )
}

DetailView.propTypes = {

}

export default DetailView;
