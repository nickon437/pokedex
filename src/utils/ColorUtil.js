class ColorUtil {
  static colorCode = {
    normal: '#bfbfb3',
    grass: '#8bd64f',
    fire: '#fa5643',
    water: '#56aeff',
    fighting: '#a75643',
    flying: '#79a4ff',
    poison: '#a85ca0',
    ground: '#eccb57',
    rock: '#cdbc72',
    bug: '#bdcb21',
    ghost: '#7975d7',
    electric: '#ffce4b',
    psychic: '#f562b1',
    ice: '#96f2ff',
    dragon: '#8a76ff',
    dark: '#876452',
    steel: '#c4c2db',
    fairy: '#faadff',
  }

  static getPrimaryTypeColor = (pokemon) => {
    const primaryType = pokemon?.types[0].type.name;
    return this.colorCode[primaryType];
  }
}

export default ColorUtil;