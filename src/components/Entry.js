import React, { useState, useEffect, useRef } from 'react';
import { cleanUpString, convertToRoman } from '../helpers/stringHelper';

const Entry = ({ pkmSpecies }) => {
  const [entry, setEntry] = useState(null);
  const versionSelectRef = useRef(null);
  const availableEntries = useRef({});
  const [optionsDropdownJsx, setOptionsDropdownJsx] = useState();

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
    setOptionsDropdownJsx(
      pokemonVersions.map((gen, index) => {
        const optionsJsx = gen
          .map((version) => {
            const entry = pkmSpecies.flavor_text_entries.find(
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

        return null;
      })
    );
  }, [pkmSpecies]);

  useEffect(() => {
    handleChangeVersion();
  }, [optionsDropdownJsx]);

  return (
    <section id='pokedex-entry-section'>
      <h2>
        Pokedex entry{' '}
        <select ref={versionSelectRef} onChange={handleChangeVersion}>
          {optionsDropdownJsx}
        </select>
      </h2>
      <p>{entry}</p>
    </section>
  );
};

export default Entry;
