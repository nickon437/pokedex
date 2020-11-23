class StringUtil {
  static makeFirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export default StringUtil;