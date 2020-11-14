"use strict";
var fetchPokemon = function () {
    var BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    var NUM_OF_POKEMON = 10;
    var promises = [];
    for (var i = 1; i <= NUM_OF_POKEMON; i++) {
        var pokemonUrl = BASE_URL + i;
        promises.push(fetch(pokemonUrl).then(function (result) { return result.json(); }));
    }
    Promise.all(promises).then(function (results) {
        var pokeData = results.map(function (data) {
            var zeros = '';
            console.log(data.id.toString().length);
            for (var i = 0; i < 3 - data.id.toString().length; i++) {
                zeros += '0';
            }
            var pokeId = "#" + zeros + data.id;
            return "<li>\n          <img src=\"./resources/img/pokeball.svg\" name=\"pokeball\"/>\n          <img src=\"" + data.sprites.other['official-artwork'].front_default + "\" name=\"pokemon\"/>\n          <div name=\"pokeId\">" + pokeId + "</div>\n          <div name=\"pokeName\">" + (data.name.charAt(0).toUpperCase() + data.name.slice(1)) + "</div>\n          <div name=\"types\">\n            <div></div>\n            <div></div>\n          </div>\n      </li>";
        });
        $('ol#poke-grid').html(pokeData.join(''));
    });
};
fetchPokemon();
