import React, { useContext } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import './Evolution.scss';
import StringUtil from '../utils/StringUtil';

const Evolution = ({ pokemons, pkmEvolution }) => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);

  const multipleEvoChainsJSX = [];

  const getEvoRequirements = (evoDetails) => {
    const evoRequirements = [];

    if (evoDetails.gender) {
      evoRequirements.push(`Gender: ${evoDetails.gender}`);
    }

    if (evoDetails.held_item) {
      evoRequirements.push(`Held item: ${evoDetails.held_item.name}`);
    }

    if (evoDetails.item) {
      evoRequirements.push(`Item: ${StringUtil.makeFirstLetterUpperCase(evoDetails.item.name.replace(/-/g, ' '))}`);
    }

    if (evoDetails.known_move) {
      evoRequirements.push(`Known move: ${evoDetails.known_move}`);
    }

    if (evoDetails.known_move_type) {
      evoRequirements.push(`Known move type: ${evoDetails.known_move_type}`);
    }

    if (evoDetails.location) {
      evoRequirements.push(`Location: ${evoDetails.location}`);
    }

    if (evoDetails.min_affection) {
      evoRequirements.push(`Minimum affection: ${evoDetails.min_affection}`);
    }

    if (evoDetails.min_beauty) {
      evoRequirements.push(`Minimum beauty: ${evoDetails.min_beauty}`);
    }

    if (evoDetails.min_happiness) {
      evoRequirements.push(`Minimum happiness: ${evoDetails.min_happiness}`);
    }

    if (evoDetails.min_level) {
      evoRequirements.push(`Lv. ${evoDetails.min_level}`);
    }

    if (evoDetails.needs_overworld_rain) {
      evoRequirements.push(`Needs overworld rain`);
    }

    if (evoDetails.party_species) {
      evoRequirements.push(`Party species: ${evoDetails.party_species}`);
    }

    if (evoDetails.party_type) {
      evoRequirements.push(`Party type: ${evoDetails.party_type}`);
    }

    if (evoDetails.relative_physical_stats) {
      evoRequirements.push(`Relative physical stat: ${evoDetails.relative_physical_stats}`);
    }

    if (evoDetails.time_of_day) {
      evoRequirements.push(`Time of day: ${evoDetails.time_of_day}`);
    }

    if (evoDetails.trade_species) {
      evoRequirements.push(`Trade: {evoDetails.trade_species}`);
    }

    if (evoDetails.turn_upside_down) {
      evoRequirements.push(`{evoDetails.turn_upside_down}`);
    }

    console.log(evoRequirements);
    return evoRequirements;
  }

  let evolution = pkmEvolution?.chain;
  const buildEvolutionChain = (evolution, evoChainJSX) => {
    const pokemonID = evolution.species.url.match(/\/\d+\//)[0].slice(1, -1);
    console.log('pokemonID', pokemonID);
    if (pokemonID > pokemons.length) {
      return;
    }

    const pokemonImgJSX = (
      <div className="pokemon-evolution">
        <img
          src={pokemons[pokemonID - 1].sprites.other['official-artwork'].front_default}
          alt={pokemons[pokemonID - 1].name}
        />
      </div>
    );
    evoChainJSX.push(pokemonImgJSX);

    if (evolution.evolves_to.length <= 0) {
      multipleEvoChainsJSX.push(evoChainJSX);
    } else {
      let index = 0;
      while (index < evolution.evolves_to.length) {
        const currentEvoChain = [...evoChainJSX];

        const nextEvolution = evolution.evolves_to.[index.toString()];

        if (nextEvolution) {
          const evolutionTrigger = (
            <div className="evolution-trigger">
              <div className="evolution-requirement">
                {getEvoRequirements(nextEvolution.evolution_details.["0"]).join('\n')}
              </div>
              <div className="arrow" />
            </div>
          );
          currentEvoChain.push(evolutionTrigger);
        }

        buildEvolutionChain(nextEvolution, currentEvoChain);

        index++;
      }
    }
    
    return;


  }

  if (evolution) {
  buildEvolutionChain(evolution, []);
}
  return (
    <section id="evolution-section">
      <h2>Evolution</h2>
      <div id="evolution-chain">
        {multipleEvoChainsJSX}
      </div>
    </section>
  )
}

export default Evolution
