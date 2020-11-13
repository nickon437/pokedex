const fetchPokemon = () => {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  const NUM_OF_POKEMON = 151;
  const promises = [];

  for (let i = 1; i <= NUM_OF_POKEMON; i++) {
    const pokemonUrl = BASE_URL + i;
    promises.push(fetch(pokemonUrl).then((result) => result.json()));
  }

  Promise.all(promises).then((results) => {
    console.log(results);
    const pokeData = results.map((data) => (
      `<li>
        <img src="${data.sprites.front_default}" />
        <div>${data.id}</div>
        <div>${data.name}</div>
      </li>`
    ));
    $('ol#poke-grid').html(pokeData);
  });
};

fetchPokemon();
