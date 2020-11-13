var fetchPokemon = function () {
    // var BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    // var NUM_OF_POKEMON = 151;
    // var promises = [];
    // for (var i = 1; i <= NUM_OF_POKEMON; i++) {
    //     var pokemonUrl = BASE_URL + i;
    //     promises.push(fetch(pokemonUrl).then(function (result) { return result.json(); }));
    // }
    // Promise.all(promises).then(function (results) {
    //     console.log(results);
    //     var pokeData = results.map(function (data) { return ("<li>\n        <img src=\"" + data.sprites.front_default + "\" />\n        <div>" + data.id + "</div>\n        <div>" + data.name + "</div>\n      </li>"); });
    //     $('ol#poke-grid').html(pokeData);
    // });
};
fetchPokemon();
