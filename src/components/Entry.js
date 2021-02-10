import React, { useState, useEffect, useRef } from 'react';
import { cleanUpString, convertToRoman } from '../helpers/stringHelper';

const Entry = ({ pkmSpecies }) => {
  const [entry, setEntry] = useState(null);
  const versionSelectRef = useRef(null);
  const availableEntries = useRef({});
  const optionsDropdownJsx = useRef();

  const pokemonVersions = [
    ['red', 'blue', 'yellow'],
    ['gold', 'silver', 'crystal'],
    ['ruby', 'sapphire', 'emerald', 'firered', 'greenleaf'],
    ['diamond', 'pearl', 'platinium', 'heartgold', 'soulsilver'],
    ['black', 'white', 'black-2', 'white-2'],
    ['x', 'y', 'omega-ruby', 'alpha-sapphire'],
    [
      'sun',
      'moon',
      'ultra-sun',
      'ultra-moon',
      'lets-go-pikachu',
      'lets-go-eevee',
    ],
    ['sword', 'shield'],
  ];

  const handleChangeVersion = () => {
    setEntry(
      availableEntries.current[
        versionSelectRef.current.value
      ]?.flavor_text.replace('', ' ')
    );
  };

  useEffect(() => {
    const generateOptionsJsx = () => {
      availableEntries.current = {};

      const genOptsJsx = pokemonVersions.map((gen, index) => {
        if (pkmSpecies) {
          const optionsJsx = gen
            .map((version) => {
              let entry = pkmSpecies.flavor_text_entries.find(
                (entry) =>
                  entry.language.name === 'en' && entry.version.name === version
              );
              if (entry) {
                availableEntries.current[version] = entry;
                return (
                  <option value={version} key={version}>
                    {cleanUpString(version)}
                  </option>
                );
              }
              return null;
            })
            .filter((version) => version);

          if (optionsJsx.length > 0) {
            return (
              <optgroup label={`GEN ${convertToRoman(index + 1)}`} key={index}>
                {optionsJsx}
              </optgroup>
            );
          }
        }

        return null;
      });

      return genOptsJsx;
    };

    optionsDropdownJsx.current = generateOptionsJsx();
  }, [pkmSpecies]);

  useEffect(() => {
    handleChangeVersion();
  }, [optionsDropdownJsx.current]);

  return (
    <section id='pokedex-entry-section'>
      <h2>
        Pokedex entry{' '}
        <select ref={versionSelectRef} onChange={handleChangeVersion}>
          {optionsDropdownJsx.current}
        </select>
      </h2>
      <p>{entry}</p>
    </section>
  );
};

export default Entry;
