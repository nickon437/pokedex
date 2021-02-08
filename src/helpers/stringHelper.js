const makeFirstLetterUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const cleanUpString = (string, shouldFirstLetterUpperCase = true) => {
  return shouldFirstLetterUpperCase
    ? makeFirstLetterUpperCase(string.replace(/-/g, ' '))
    : string.replace(/-/g, ' ');
};

const formatPokemonId = (number) => {
  let zeros = '';
  for (let i = 0; i < 3 - number.toString().length; i++) {
    zeros += '0';
  }
  return `#${zeros}${number}`;
};

const convertToRoman = (number) => {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let str = '';

  for (let i of Object.keys(roman)) {
    let q = Math.floor(number / roman[i]);
    number -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
};

export {
  makeFirstLetterUpperCase,
  cleanUpString,
  formatPokemonId,
  convertToRoman,
};
