class StringUtil {
  static makeFirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static cleanUpString = (string, shouldFirstLetterUpperCase = true) => {
    return shouldFirstLetterUpperCase ? StringUtil.makeFirstLetterUpperCase(string.replace(/-/g, ' ')) : string.replace(/-/g, ' ');
  }

  static formatPokemonId = (number) => {
    let zeros = '';
    for (let i = 0; i < 3 - number.toString().length; i++) {
      zeros += '0';
    }
    return `#${zeros}${number}`;
  }
}

export default StringUtil;