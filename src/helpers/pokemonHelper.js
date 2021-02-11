const gens = [151, 251, 386, 493, 649, 721, 809, 898];

const getPokemonsByGenIndex = (pokemons, genIndex) => {
  const startPkmIndex = genIndex === 0 ? 0 : gens[genIndex - 1];
  return pokemons.slice(startPkmIndex, gens[genIndex]);
};

const getGenPokemonsById = (pokemons, id) => {
  const genIndex = getGenIndexById(id)
  return getPokemonsByGenIndex(pokemons, genIndex);
};

const getGenIndexById = (id) => {
  const gen = gens.find((gen) => id <= gen);
  return gens.indexOf(gen);
}

const getFrontSprite = (pokemon) => {
  return pokemon.sprites.other['official-artwork'].front_default;
}

const getFrontIcon = (pokemon) => {
  return pokemon.sprites.versions['generation-vii'].icons.front_default;
}

export { gens, getPokemonsByGenIndex, getGenPokemonsById, getGenIndexById, getFrontSprite, getFrontIcon };
