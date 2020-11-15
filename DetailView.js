const codifyStatName = (name) => {
    switch (name) {
        case 'hp':
            return 'HP';
        case 'attack':
            return 'ATK';
        case 'defense':
            return 'DEF';
        case 'special-attack':
            return 'SPA';
        case 'special-defense':
            return 'SPD';
        case 'speed':
            return 'SPE';
        default:
            return 'UNKNOWN';
    }
};
const DetailView = async (pkm) => {
    let zeros = '';
    for (let i = 0; i < 3 - pkm.id.toString().length; i++) {
        zeros += '0';
    }
    const pokeId = `#${zeros}${pkm.id}`;
    let types = '';
    for (let i = 0; i < pkm.types.length; i++) {
        types += `<div>${pkm.types[i].type.name.toUpperCase()}</div>`;
    }
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pkm.id}`;
    const pkmSpecies = await fetch(pokemonSpeciesUrl).then((result) => result.json());
    console.log(pkmSpecies);
    console.log(pkm);
    // console.log('end', res);
    // const pokemonStatUrl = `https://pokeapi.co/api/v2/stat/${pkm.id}`;
    // const pkmStat = await fetch(pokemonStatUrl).then((result) => result.json());
    // console.log(pkmStat);
    let statHtml = '';
    let totalStat = 0;
    for (let i = 0; i < pkm.stats.length; i++) {
        const baseStat = pkm.stats[i].base_stat;
        statHtml += `
      <div class="label">${codifyStatName(pkm.stats[i].stat.name)}</div>
      <div class="figure">${baseStat}</div>
      <div class="progress-bar">
        <div style="width: ${baseStat / 255}"></div>
      </div>`;
        totalStat += baseStat;
    }
    const detailHtml = `
    <div id="overview">
      <div class="background-patterns">
        <img src="./resources/img/pokeball.svg" name="pokeball"/>
        <svg width="154" height="215" name="dots-1"><circle cx="46" cy="108" r="15"/><circle cx="108" cy="108" r="15"/><circle cx="46" cy="169" r="15"/><circle cx="108" cy="169" r="15"/><line x1="46" y1="46" x2="108" y2="46" stroke="currentColor" stroke-width="30" stroke-linecap="round"/></svg>
        <svg x="0px" y="0px" viewBox="0 0 297.613 297.613" name="dots-2"><g><circle cx="15.279" cy="14.83" r="14.83"/><circle cx="59.32" cy="59.769" r="14.83"/><circle cx="59.32" cy="14.83" r="14.83"/><circle cx="104.261" cy="59.769" r="14.83"/><circle cx="104.261" cy="103.81" r="14.83"/><circle cx="104.261" cy="14.83" r="14.83"/><circle cx="148.302" cy="59.769" r="14.83"/><circle cx="148.302" cy="103.81" r="14.83"/><circle cx="148.302" cy="14.83" r="14.83"/><circle cx="192.343" cy="59.769" r="14.83"/><circle cx="192.343" cy="103.81" r="14.83"/><circle cx="148.302" cy="147.852" r="14.83"/><circle cx="192.343" cy="147.852" r="14.83"/><circle cx="104.261" cy="192.79" r="14.831"/><circle cx="148.302" cy="192.79" r="14.831"/><circle cx="192.343" cy="192.79" r="14.831"/><circle cx="59.32" cy="236.887" r="14.83"/><circle cx="104.261" cy="236.887" r="14.83"/><circle cx="148.302" cy="236.887" r="14.83"/><circle cx="192.343" cy="236.887" r="14.83"/><circle cx="238.238" cy="103.81" r="14.83"/><circle cx="238.238" cy="147.852" r="14.83"/><circle cx="238.238" cy="192.79" r="14.831"/><circle cx="15.279" cy="282.782" r="14.831"/><circle cx="59.32" cy="282.782" r="14.831"/><circle cx="104.261" cy="282.782" r="14.831"/><circle cx="148.302" cy="282.782" r="14.831"/><circle cx="282.334" cy="147.852" r="14.83"/></g></svg>
      </div>
      <img src="${pkm.sprites.other['official-artwork'].front_default}" name="pokemon"></img>
      <div name="basic-data">
        <div class="pokeId">${pokeId}</div>
        <div class="pokeName">${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
        <div class="pokeTypes hflex">${types}</div>
      </div> 
    </div>
    <div id="detail-data">
      <h2>Pokedex entry</h2>
      <div>${pkmSpecies.flavor_text_entries[0].flavor_text}</div>
      <h2>Stats</h2>
      <div class="progress-bar-container">
        ${statHtml}
        <div class="label">TOTAL</div>
        <div class="figure">${totalStat}</div>
      </div>
    </div>`;
    $('#detail-view').html(detailHtml);
};
export default DetailView;
