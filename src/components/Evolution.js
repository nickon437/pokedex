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
      evoConditions.push(<div>Gender: {evoDetails.gender}</div>);
    }

    if (evoDetails.held_item) {
      evoConditions.push(<div>Held item: {evoDetails.held_item.name}</div>);
    }

    if (evoDetails.item) {
      const evoItemUrl = evoDetails.item.url;
      const evoItem = await fetch(evoItemUrl).then((result) => result.json());
      const evoItemSpriteUrl = evoItem.sprites.default;
      evoConditions.push(<div><img src={evoItemSpriteUrl} alt={StringUtil.cleanUpString(evoItem.name)} /></div>);
    }

    if (evoDetails.known_move) {
      evoConditions.push(<div>Known move: {evoDetails.known_move}</div>);
    }

    if (evoDetails.known_move_type) {
      evoConditions.push(<div>Known move type: {evoDetails.known_move_type}</div>);
    }

    if (evoDetails.location) {
      evoConditions.push(<div>Location: {evoDetails.location}</div>);
    }

    if (evoDetails.min_affection) {
      evoConditions.push(<div>Affection: {evoDetails.min_affection}</div>);
    }

    if (evoDetails.min_beauty) {
      evoConditions.push(<div>Beauty: {evoDetails.min_beauty}</div>);
    }

    if (evoDetails.min_happiness) {
      evoConditions.push(<div>Happiness: {evoDetails.min_happiness}</div>);
    }

    if (evoDetails.min_level) {
      evoConditions.push(<div>Lv. {evoDetails.min_level}</div>);
    }

    if (evoDetails.needs_overworld_rain) {
      evoConditions.push(<div>Overworld rain</div>);
    }

    if (evoDetails.party_species) {
      evoConditions.push(<div>Party species: {evoDetails.party_species}</div>);
    }

    if (evoDetails.party_type) {
      evoConditions.push(<div>Party type: {evoDetails.party_type}</div>);
    }

    if (evoDetails.relative_physical_stats) {
      evoConditions.push(<div>Relative physical stat: {evoDetails.relative_physical_stats}</div>);
    }

    if (evoDetails.time_of_day) {
      evoConditions.push(<div>{evoDetails.time_of_day}</div>);
    }

    if (evoDetails.trade_species) {
      evoConditions.push(<div>Trade: {evoDetails.trade_species}</div>);
    }
    
    if (evoDetails.trigger
    && evoDetails.trigger.name !== 'level-up'
    && evoDetails.trigger.name !== 'use-item') {
      evoConditions.push(<div>{StringUtil.cleanUpString(evoDetails.trigger.name)}</div>);
    }

    if (evoDetails.turn_upside_down) {
      evoConditions.push(<div>Turn upside down</div>);
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
