import DetailView from './DetailView.js';

const PokeGrid = (pokemons) => {
  const pokeData = pokemons.map((pkm) => {
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
          <div class="background-patterns" name="background-patterns">
            <img src="./resources/img/pokeball.svg" name="pokeball"/>
            <svg name="dots-1" viewBox="0 0 45.767 45.767" xml:space="preserve">
              <path d="M11.965,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0    c0,2.434-1.968,4.393-4.393,4.393l0,0C13.933,45.73,11.965,43.77,11.965,41.336z M11.965,29.034c0-2.425,1.968-4.393,4.393-4.393    l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.968,4.393-4.393,4.393l0,0C13.933,33.428,11.965,31.46,11.965,29.034z     M11.965,16.733c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.434-1.968,4.393-4.393,4.393l0,0    C13.933,21.126,11.965,19.167,11.965,16.733z"/>
              <path d="M24.478,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0    c0,2.434-1.968,4.393-4.393,4.393l0,0C26.446,45.73,24.478,43.77,24.478,41.336z M24.478,29.034c0-2.425,1.968-4.393,4.393-4.393    l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.968,4.393-4.393,4.393l0,0C26.446,33.428,24.478,31.46,24.478,29.034z     M24.478,16.733c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393l0,0c0,2.434-1.968,4.393-4.393,4.393l0,0    C26.446,21.126,24.478,19.167,24.478,16.733z M24.478,4.431c0-2.425,1.968-4.393,4.393-4.393l0,0c2.425,0,4.393,1.968,4.393,4.393    l0,0c0,2.425-1.968,4.393-4.393,4.393l0,0C26.446,8.825,24.478,6.856,24.478,4.431z"/>
              <path d="M36.981,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0c2.434,0,4.393,1.968,4.393,4.393l0,0    c0,2.425-1.959,4.393-4.393,4.393l0,0C38.95,45.73,36.981,43.762,36.981,41.336z M0,41.336c0-2.425,1.968-4.393,4.393-4.393l0,0    c2.434,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.959,4.393-4.393,4.393l0,0C1.968,45.73,0,43.762,0,41.336z M36.981,29.034    c0-2.425,1.968-4.393,4.393-4.393l0,0c2.434,0,4.393,1.968,4.393,4.393l0,0c0,2.425-1.959,4.393-4.393,4.393l0,0    C38.95,33.428,36.981,31.46,36.981,29.034z"/>
            </svg>
          </div>
          <img src="${pkm.sprites.other['official-artwork'].front_default}" name="pokemon"/>
          <div name="pokeId" class="pokeId">${pokeId}</div>
          <div name="pokeName" class="pokeName">${pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1)}</div>
          <div name="pokeTypes" class="pokeTypes hflex">
            ${types}
          </div>
      </li>`;
  });
  $('ol#poke-grid').html(pokeData.join(''));

  // Setup onclick function for each li
  const listItems = $('ol#poke-grid > li');
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].onclick = () => DetailView(pokemons[i]);
  }
};

export default PokeGrid;
