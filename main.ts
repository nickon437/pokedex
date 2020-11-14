const fetchPokemon = () => {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  const NUM_OF_POKEMON = 10;
  const promises = [];

  for (let i = 1; i <= NUM_OF_POKEMON; i++) {
    const pokemonUrl = BASE_URL + i;
    promises.push(fetch(pokemonUrl).then((result) => result.json()));
  }

  Promise.all(promises).then((results) => {
    const pokeData = results.map((data) => {
      let zeros = '';
      console.log(data.id.toString().length);
      for (let i = 0; i < 3 - data.id.toString().length; i++) {
        zeros += '0';
      }

      const pokeId = `#${zeros}${data.id}`;
      return `<li>
          <img src="${data.sprites.other['official-artwork'].front_default}" />
          <div name="pokeId">${pokeId}</div>
          <div name="pokeName">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</div>
      </li>`;
    });
    $('ol#poke-grid').html(pokeData.join(''));
  });
};

fetchPokemon();
