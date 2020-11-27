import React from 'react';
import StringUtil from '../utils/StringUtil';

const PokeEntry = ({ pkmSpecies }) => {
  console.log('pkmSpecies', pkmSpecies);
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

  const availableEntries = {};

  const pokeEntry = () => {
    if (pkmSpecies) {
      let entry = pkmSpecies.flavor_text_entries.find((entry) => (entry.language.name === 'en')).flavor_text;
      return entry.replace('', ' '); // Clean up entry text
    }
  };

  const genOptsJsx = pokemonVersions.map((gen, index) => {
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
    return;
  });

  return (
    <section id="pokedex-entry-section">
      <div className="heading">
        <h2>Pokedex entry</h2>
        <select>{genOptsJsx}</select>
      </div>
      <div>{pokeEntry()}</div>
    </section>
  )
}

export default PokeEntry;
