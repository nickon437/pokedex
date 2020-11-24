import React, { useContext, useEffect, useCallback, useState } from 'react';
import { PokedexContext } from '../context/PokedexContext';
import './Evolution.scss';
import StringUtil from '../utils/StringUtil';

const Evolution = ({ pokemons, pkmEvolution }) => {
  const [ctxPokedex, setCtxPokedex] = useContext(PokedexContext);
  const [multiEvoChainsJsx, setMultiEvoChainsJsx] = useState([]);

  const getEvoConditions = async (evoDetails) => {
    const evoConditions = [];

    if (evoDetails.gender) {
      evoConditions.push(`Gender: ${evoDetails.gender}`);
    }

    if (evoDetails.held_item) {
      evoConditions.push(`Held item: ${evoDetails.held_item.name}`);
    }

    if (evoDetails.item) {
      const evoItemUrl = evoDetails.item.url;
      const evoItem = await fetch(evoItemUrl).then((result) => result.json());
      const evoItemSpriteUrl = evoItem.sprites.default;
      evoConditions.push(<div><img src={evoItemSpriteUrl} alt={StringUtil.cleanUpString(evoItem.name)} /></div>);
    }

    if (evoDetails.known_move) {
      evoConditions.push(`Known move: ${evoDetails.known_move}`);
    }

    if (evoDetails.known_move_type) {
      evoConditions.push(`Known move type: ${evoDetails.known_move_type}`);
    }

    if (evoDetails.location) {
      evoConditions.push(`Location: ${evoDetails.location}`);
    }

    if (evoDetails.min_affection) {
      evoConditions.push(`Affection: ${evoDetails.min_affection}`);
    }

    if (evoDetails.min_beauty) {
      evoConditions.push(`Beauty: ${evoDetails.min_beauty}`);
    }

    if (evoDetails.min_happiness) {
      evoConditions.push(`Happiness: ${evoDetails.min_happiness}`);
    }

    if (evoDetails.min_level) {
      evoConditions.push(<div>Lv. {evoDetails.min_level}</div>);
    }

    if (evoDetails.needs_overworld_rain) {
      evoConditions.push(`Overworld rain`);
    }

    if (evoDetails.party_species) {
      evoConditions.push(`Party species: ${evoDetails.party_species}`);
    }

    if (evoDetails.party_type) {
      evoConditions.push(`Party type: ${evoDetails.party_type}`);
    }

    if (evoDetails.relative_physical_stats) {
      evoConditions.push(`Relative physical stat: ${evoDetails.relative_physical_stats}`);
    }

    if (evoDetails.time_of_day) {
      evoConditions.push(evoDetails.time_of_day);
    }

    if (evoDetails.trade_species) {
      evoConditions.push(`Trade: {evoDetails.trade_species}`);
    }
    
    if (evoDetails.trigger && evoDetails.trigger.name !== 'level-up' && evoDetails.trigger.name !== 'use-item') {
      evoConditions.push(`${StringUtil.cleanUpString(evoDetails.trigger.name)}`);
    }

    if (evoDetails.turn_upside_down) {
      evoConditions.push('Turn upside down');
    }

    return evoConditions;
  }

  const buildEvolutionChain =  useCallback(async (evolution, evoChainJsx, pokemons) => {
    const pokemonId = parseInt(evolution.species.url.match(/\/\d+\//)[0].slice(1, -1));
    if (pokemonId > pokemons.length) {
      setMultiEvoChainsJsx((prev) => [...prev, <div className="hflex">{evoChainJsx.slice(0, -1)}</div>]);
      return;
    }

    const pokemonImgJsx = (
      <div className="pokemon-evolution">
        <img
          src={pokemons[pokemonId - 1].sprites.other['official-artwork'].front_default}
          alt={pokemons[pokemonId - 1].name}
        />
      </div>
    );
    evoChainJsx.push(pokemonImgJsx);

    if (evolution.evolves_to.length <= 0) {
      setMultiEvoChainsJsx((prev) => [...prev, <div className="hflex">{evoChainJsx}</div>]);
    } else {
      let branchIndex = 0;
      while (branchIndex < evolution.evolves_to.length) {
        const currentEvoChain = [...evoChainJsx];
        const nextEvolution = evolution.evolves_to.[branchIndex.toString()];

        const evolutionTrigger = (
          <div className="evolution-trigger">
            <div className="evolution-condition">
              {(await getEvoConditions(nextEvolution.evolution_details.["0"]))}
            </div>
            <div className="arrow" />
          </div>
        );
        currentEvoChain.push(evolutionTrigger);

        buildEvolutionChain(nextEvolution, currentEvoChain, pokemons);
        branchIndex++;
      }
    }
    return;
  }, []);

  useEffect(() => {
    if (pkmEvolution) {
      setMultiEvoChainsJsx([]);
      let evolution = pkmEvolution.chain;
      buildEvolutionChain(evolution, [], pokemons);
    }
  }, [pkmEvolution]);

  return (
    <section id="evolution-section">
      <h2>Evolution</h2>
      <div id="evolution-chain">
        {multiEvoChainsJsx}
      </div>
    </section>
  )
}

export default Evolution;
