import React, { useState, useEffect, useRef } from 'react';
import StringUtil from '../utils/StringUtil';

const PokeEntry = ({ pkmSpecies }) => {
  const [pokeEntry, setPokeEntry] = useState(null);
  const versionSelectRef = useRef(null);

  const pokemonVersions = [
    ['red', 'blue', 'yellow'],
    ['gold', 'silver', 'crystal'],
    ['ruby', 'sapphire', 'emerald',
      'firered', 'greenleaf'],
    ['diamond', 'pearl', 'platinium',
      'heartgold', 'soulsilver'],
    ['black', 'white',
      'black-2', 'white-2'],
    ['x', 'y',
      'omega-ruby', 'alpha-sapphire'],
    ['sun', 'moon',
      'ultra-sun', 'ultra-moon',
      'lets-go-pikachu', 'lets-go-eevee'],
    ['sword', 'shield'],
  ];

  let availableEntries = {};

  const generateOptionsJsx = () => {
    availableEntries = {}
    
    const genOptsJsx = pokemonVersions.map((gen, index) => {
      if (pkmSpecies) {
        const optionsJsx = gen.map((version) => {
          let entry = pkmSpecies.flavor_text_entries.find((entry) => (entry.language.name === 'en' && entry.version.name === version));
          if (entry) {
            availableEntries[version] = entry;
            return (<option value={version}>{StringUtil.cleanUpString(version)}</option>);
          }
          return;
        });

        if (optionsJsx) {
          return (<optgroup label={`GENERATION ${StringUtil.convertToRoman(index + 1)}`}>
            {optionsJsx}
          </optgroup>);
        }
      }

      return;
    });

    return genOptsJsx;
  }

  const handleChangeVersion = () => {
    setPokeEntry(availableEntries[versionSelectRef.current.value].flavor_text.replace('', ' '));
  };

  useEffect(() => {
    console.log('useEffect');
    handleChangeVersion();
  }, [pkmSpecies]);

  return (
    <section id="pokedex-entry-section">
      <h2>Pokedex entry <select ref={versionSelectRef} onChange={handleChangeVersion}>{generateOptionsJsx()}</select></h2>
      <div>{pokeEntry}</div>
    </section>
  )
}

export default PokeEntry;
