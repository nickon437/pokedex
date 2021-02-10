import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { cleanUpString } from '../helpers/stringHelper';
import axios from 'axios';
import '../styles/Evolution.scss';

const Evolution = ({ pokemons, pkmEvolution }) => {
  const [multiEvoChainsJsx, setMultiEvoChainsJsx] = useState([]);

  const getEvoConditions = async (evoDetails) => {
    const evoConditions = [];

    if (evoDetails.gender) {
      evoConditions.push(<div>Gender: {evoDetails.gender}</div>);
    }

    if (evoDetails.held_item) {
      evoConditions.push(
        <div>Hold {cleanUpString(evoDetails.held_item.name, false)}</div>
      );
    }

    if (evoDetails.item) {
      const evoItemUrl = evoDetails.item.url;
      const evoItemData = (await axios.get(evoItemUrl)).data;
      const evoItemSpriteUrl = evoItemData.sprites.default;
      evoConditions.push(
        <div>
          <img src={evoItemSpriteUrl} alt={cleanUpString(evoItemData.name)} />
        </div>
      );
    }

    if (evoDetails.known_move) {
      evoConditions.push(<div>Known move: {evoDetails.known_move}</div>);
    }

    if (evoDetails.known_move_type) {
      evoConditions.push(
        <div>Known move type: {evoDetails.known_move_type}</div>
      );
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
      evoConditions.push(
        <div>Relative physical stat: {evoDetails.relative_physical_stats}</div>
      );
    }

    if (evoDetails.time_of_day) {
      evoConditions.push(<div>{cleanUpString(evoDetails.time_of_day)}</div>);
    }

    if (evoDetails.trade_species) {
      evoConditions.push(<div>Trade: {evoDetails.trade_species}</div>);
    }

    if (
      evoDetails.trigger &&
      evoDetails.trigger.name !== 'level-up' &&
      evoDetails.trigger.name !== 'use-item'
    ) {
      evoConditions.push(<div>{cleanUpString(evoDetails.trigger.name)}</div>);
    }

    if (evoDetails.turn_upside_down) {
      evoConditions.push(<div>Turn upside down</div>);
    }

    return evoConditions;
  };

  const buildEvolutionChain = useCallback(
    async (evolution, evoChainJsx, pokemons, currentBranchIndex) => {
      const pkmId = parseInt(
        evolution.species.url.match(/\/\d+\//)[0].slice(1, -1)
      );

      if (pkmId > pokemons.length) {
        // Skip alternative evolution branch with undefined post-evolution form
        if (currentBranchIndex > 0) {
          return;
          // Stop build evolution branch and return it once there is undefined form
        } else if (evoChainJsx.length !== 0) {
          setMultiEvoChainsJsx((prev) => [
            ...prev,
            <div className='evolution-chain'>{evoChainJsx.slice(0, -1)}</div>,
          ]);
          return;
        }
      } else {
        // Generate img of pokemon
        const pkm = pokemons[pkmId - 1];
        const pokemonImgJsx = (
          <Link to={`/pokemon/${pkm.id}`} className='pokemon-evolution'>
            <img
              src={pkm.sprites.other['official-artwork'].front_default}
              alt={pkm.name}
            />
          </Link>
        );
        evoChainJsx.push(pokemonImgJsx);
      }

      // Stop build evolution chain when it reaches at the end of the chain
      if (evolution.evolves_to.length <= 0) {
        setMultiEvoChainsJsx((prev) => [
          ...prev,
          <div className='evolution-chain'>{evoChainJsx}</div>,
        ]);
      } else {
        let nextBranchIndex = 0;
        // Explore and build evolution chain of multiple branches
        while (nextBranchIndex < evolution.evolves_to.length) {
          // Generate copy of evoChain to reuse of different branches
          const currentEvoChain = [...evoChainJsx];
          const nextEvolution =
            evolution.evolves_to[nextBranchIndex.toString()];

          // Skip evolution trigger if there is undefined baby form
          if (currentEvoChain.length > 0) {
            const evoTriggerJsx = (
              <div className='evolution-trigger'>
                <div className='evolution-condition'>
                  {await getEvoConditions(nextEvolution.evolution_details['0'])}
                </div>
                <div className='arrow' />
              </div>
            );
            currentEvoChain.push(evoTriggerJsx);
          }

          buildEvolutionChain(
            nextEvolution,
            currentEvoChain,
            pokemons,
            nextBranchIndex
          );
          nextBranchIndex++;
        }
      }
      return;
    },
    []
  );

  useEffect(() => {
    if (pkmEvolution) {
      setMultiEvoChainsJsx([]);
      let evolution = pkmEvolution.chain;
      buildEvolutionChain(evolution, [], pokemons, 0);
    }
  }, [pkmEvolution]);

  return (
    <section id='evolution-section'>
      <h2>Evolution</h2>
      <div id='evolution-chain-list'>{multiEvoChainsJsx}</div>
    </section>
  );
};

export default Evolution;
