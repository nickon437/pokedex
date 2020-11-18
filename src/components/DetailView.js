import React, { useContext, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';
import PokeBasicInfo from './PokeBasicInfo';
import { PokedexContext } from '../context/PokedexContext';
import Pokeball from '../resources/img/pokeball.svg';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DetailView = () => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const [pkmSpecies, setPkmSpecies] = useState(null);

  // const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${ctxPokedex.id}`;
  // const pkmSpecies = await fetch(pokemonSpeciesUrl).then((result) => result.json());

  const fetchSpecies = useCallback(async (selectedPkm) => {
    console.log('fetchSpecies', ctxPokedex);
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${selectedPkm.id}`;
    // pkmSpecies.current = await fetch(pokemonSpeciesUrl).then((result) => result.json());
    setPkmSpecies(await fetch(pokemonSpeciesUrl).then((result) => result.json()));
    // const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    // const NUM_OF_POKEMON = 3;
    // const promises = [];
    // let pokemons;
    // for (let i = 1; i <= NUM_OF_POKEMON; i++) {
    //   const pokemonUrl = BASE_URL + i;
    //   promises.push(fetch(pokemonUrl).then((result) => result.json()));
    // }
    // pokemons = await Promise.all(promises);
    // setCtxPokedex((prev) => ({
    //   ...prev,
    //   pokemons,
    // }));
    console.log('DetailView');
  }, []);

  useEffect(() => {
    console.log('DetailView fetchSpecies', ctxPokedex);
    if (ctxPokedex.selectedPkm) {
      fetchSpecies(ctxPokedex.selectedPkm);
    }
  }, [ctxPokedex.selectedPkm]);

  const handleClickCancel = async () => {
    setCtxPokedex((prev) => ({
      ...prev,
      class: {
        ...prev.class,
        reverseSplitView: true,
      }
    }));

    await sleep(1000);
    
    setCtxPokedex((prev) => ({
      ...prev,
      class: {
        ...prev.class,
        splitView: false,
        reverseSplitView: false,
      }
    }));
  };

  return (
    <div id="detail-view">
      <div id="overview">
        <div className="background-patterns">
          <img src={Pokeball} name="pokeball" alt="pokebal"/>
          <svg width="154" height="215" name="dots-1"><circle cx="46" cy="108" r="15" /><circle cx="108" cy="108" r="15" /><circle cx="46" cy="169" r="15" /><circle cx="108" cy="169" r="15" /><line x1="46" y1="46" x2="108" y2="46" stroke="currentColor" stroke-width="30" stroke-linecap="round" /></svg>
          <svg x="0px" y="0px" viewBox="0 0 297.613 297.613" name="dots-2"><g><circle cx="15.279" cy="14.83" r="14.83" /><circle cx="59.32" cy="59.769" r="14.83" /><circle cx="59.32" cy="14.83" r="14.83" /><circle cx="104.261" cy="59.769" r="14.83" /><circle cx="104.261" cy="103.81" r="14.83" /><circle cx="104.261" cy="14.83" r="14.83" /><circle cx="148.302" cy="59.769" r="14.83" /><circle cx="148.302" cy="103.81" r="14.83" /><circle cx="148.302" cy="14.83" r="14.83" /><circle cx="192.343" cy="59.769" r="14.83" /><circle cx="192.343" cy="103.81" r="14.83" /><circle cx="148.302" cy="147.852" r="14.83" /><circle cx="192.343" cy="147.852" r="14.83" /><circle cx="104.261" cy="192.79" r="14.831" /><circle cx="148.302" cy="192.79" r="14.831" /><circle cx="192.343" cy="192.79" r="14.831" /><circle cx="59.32" cy="236.887" r="14.83" /><circle cx="104.261" cy="236.887" r="14.83" /><circle cx="148.302" cy="236.887" r="14.83" /><circle cx="192.343" cy="236.887" r="14.83" /><circle cx="238.238" cy="103.81" r="14.83" /><circle cx="238.238" cy="147.852" r="14.83" /><circle cx="238.238" cy="192.79" r="14.831" /><circle cx="15.279" cy="282.782" r="14.831" /><circle cx="59.32" cy="282.782" r="14.831" /><circle cx="104.261" cy="282.782" r="14.831" /><circle cx="148.302" cy="282.782" r="14.831" /><circle cx="282.334" cy="147.852" r="14.83" /></g></svg>
          <button id="cancel-btn" name="cancel-btn" type="button" onClick={handleClickCancel}>
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
          </button>
        </div>
        <PokeBasicInfo pkm={ctxPokedex.selectedPkm} />
      </div>
      <div id="detail-data">
        <h2>Pokedex entry</h2>
        {/* <div>{pkmSpecies.current && pkmSpecies.current.flavor_text_entries[0].flavor_text}</div> */}
        <div>{pkmSpecies && pkmSpecies.flavor_text_entries[0].flavor_text}</div>
        <Stat pkm={ctxPokedex.selectedPkm} />
      </div>
    </div>
  )
}

DetailView.propTypes = {

}

export default DetailView;
