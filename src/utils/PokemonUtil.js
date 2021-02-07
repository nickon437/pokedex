const gens = [151, 251, 386, 493, 649, 721, 809, 898];

const getPokemonsByGenIndex = (pokemons, genIndex) => {
  const startPkmIndex = genIndex === 0 ? 0 : gens[genIndex - 1];
  console.log('pokemons', pokemons);
  console.log('getPokemonsByGenIndex', pokemons.slice(startPkmIndex, gens[genIndex]));
  return pokemons.slice(startPkmIndex, gens[genIndex]);
};

const getGenPokemonsById = (pokemons, id) => {
  console.log('getGenPokemonsById');
  const genIndex = getGenIndexById(id)
  return getPokemonsByGenIndex(pokemons, genIndex);
};

const getGenIndexById = (id) => {
  const gen = gens.find((gen) => id <= gen);
  return gens.indexOf(gen);
}

const getFrontSprite = (pokemons, id) => {
  return pokemons[id -1].sprites.other['official-artwork'].front_default;
}

export { getPokemonsByGenIndex, getGenPokemonsById, getGenIndexById, getFrontSprite };
