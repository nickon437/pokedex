import DetailView from './DetailView.js';
const PokeList = (pokemons) => {
    // const pokeIconUrl = pokemons[0].sprites.versions["generation-viii"].icons.front_default;
    // console.log(pokemons[0].sprites.versions["generation-viii"].icons.front_default);
    const pokeListHtml = pokemons.map((pkm) => {
        let zeros = '';
        for (let i = 0; i < 3 - pkm.id.toString().length; i++) {
            zeros += '0';
        }
        const pokeId = `#${zeros}${pkm.id}`;
        let types = '';
        for (let i = 0; i < pkm.types.length; i++) {
            types += `<div>${pkm.types[i].type.name.toUpperCase()}</div>`;
        }
        return `<li>
      <div class="hflex" name="info-container">
        <img src="${pkm.sprites.versions['generation-vii'].icons.front_default}" name="pokemon"/>
        <div class="pokeOverview">
          <div class="hflex">
            <div name="pokeId" class="pokeId">${pokeId}</div>
            <div name="pokeName" class="pokeName">${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
          </div>
        </div>
      </div>
    </li>`;
    });
    $('ol#poke-list').html(pokeListHtml.join(''));
    // Setup onclick function for each li
    const listItems = $('ol#poke-list > li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].onclick = () => DetailView(pokemons[i]);
    }
};
export default PokeList;
