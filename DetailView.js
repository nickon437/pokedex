"use strict";
var DetailView = function () {
    console.log('detail');
    var BASE_URL = "https://pokeapi.co/api/v2/pokemon/" + 1;
    fetch(BASE_URL)
        .then(function (result) { return result.json(); })
        .then(function (data) {
        var zeros = '';
        for (var i = 0; i < 3 - data.id.toString().length; i++) {
            zeros += '0';
        }
        var pokeId = "#" + zeros + data.id;
        var types = '';
        for (var i = 0; i < data.types.length; i++) {
            types += "<div>" + data.types[i].type.name.toUpperCase() + "</div>";
        }
        var detailHtml = "\n        <div id=\"overview\">\n          <img src=\"" + data.sprites.other['official-artwork'].front_default + "\"></img>\n          <div name=\"basic-data\">\n            <div name=\"pokeId\">" + pokeId + "</div>\n              <div name=\"pokeName\">" + (data.name.charAt(0).toUpperCase() + data.name.slice(1)) + "</div>\n              <div name=\"pokeTypes\" class=\"hflex\">\n                " + types + "\n              </div>\n            </div>\n          </div>\n        </div>\n      ";
        $('#detail-view').html(detailHtml);
    });
};
DetailView();
