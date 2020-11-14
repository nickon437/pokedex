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
        var detailHtml = "\n        <div id=\"overview\">\n          <div class=\"background-patterns\">\n            <img src=\"./resources/img/pokeball.svg\" name=\"pokeball\"/>\n            <svg width=\"154\" height=\"215\" name=\"dots-1\">\n              <circle cx=\"46\" cy=\"108\" r=\"15\"/>\n              <circle cx=\"108\" cy=\"108\" r=\"15\"/>\n              <circle cx=\"46\" cy=\"169\" r=\"15\"/>\n              <circle cx=\"108\" cy=\"169\" r=\"15\"/>\n              <line x1=\"46\" y1=\"46\" x2=\"108\" y2=\"46\" stroke=\"currentColor\" stroke-width=\"30\" stroke-linecap=\"round\"/>\n            </svg>\n            <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 297.613 297.613\" name=\"dots-2\">\n              <g><circle cx=\"15.279\" cy=\"14.83\" r=\"14.83\"/><circle cx=\"59.32\" cy=\"59.769\" r=\"14.83\"/><circle cx=\"59.32\" cy=\"14.83\" r=\"14.83\"/><circle cx=\"104.261\" cy=\"59.769\" r=\"14.83\"/><circle cx=\"104.261\" cy=\"103.81\" r=\"14.83\"/><circle cx=\"104.261\" cy=\"14.83\" r=\"14.83\"/><circle cx=\"148.302\" cy=\"59.769\" r=\"14.83\"/><circle cx=\"148.302\" cy=\"103.81\" r=\"14.83\"/><circle cx=\"148.302\" cy=\"14.83\" r=\"14.83\"/><circle cx=\"192.343\" cy=\"59.769\" r=\"14.83\"/><circle cx=\"192.343\" cy=\"103.81\" r=\"14.83\"/><circle cx=\"148.302\" cy=\"147.852\" r=\"14.83\"/><circle cx=\"192.343\" cy=\"147.852\" r=\"14.83\"/><circle cx=\"104.261\" cy=\"192.79\" r=\"14.831\"/><circle cx=\"148.302\" cy=\"192.79\" r=\"14.831\"/><circle cx=\"192.343\" cy=\"192.79\" r=\"14.831\"/><circle cx=\"59.32\" cy=\"236.887\" r=\"14.83\"/><circle cx=\"104.261\" cy=\"236.887\" r=\"14.83\"/><circle cx=\"148.302\" cy=\"236.887\" r=\"14.83\"/><circle cx=\"192.343\" cy=\"236.887\" r=\"14.83\"/><circle cx=\"238.238\" cy=\"103.81\" r=\"14.83\"/><circle cx=\"238.238\" cy=\"147.852\" r=\"14.83\"/><circle cx=\"238.238\" cy=\"192.79\" r=\"14.831\"/><circle cx=\"15.279\" cy=\"282.782\" r=\"14.831\"/><circle cx=\"59.32\" cy=\"282.782\" r=\"14.831\"/><circle cx=\"104.261\" cy=\"282.782\" r=\"14.831\"/><circle cx=\"148.302\" cy=\"282.782\" r=\"14.831\"/><circle cx=\"282.334\" cy=\"147.852\" r=\"14.83\"/></g>\n            </svg>\n\n          </div>\n          <img src=\"" + data.sprites.other['official-artwork'].front_default + "\"></img>\n          <div name=\"basic-data\">\n            <div class=\"pokeId\">" + pokeId + "</div>\n            <div class=\"pokeName\">" + (data.name.charAt(0).toUpperCase() + data.name.slice(1)) + "</div>\n            <div class=\"pokeTypes hflex\">\n              " + types + "\n            </div>\n          </div>\n        </div>\n      ";
        $('#detail-view').html(detailHtml);
    });
};
DetailView();
