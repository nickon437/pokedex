class StringUtil {
  static makeFirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static cleanUpString = (string) => {
    return StringUtil.makeFirstLetterUpperCase(string.replace(/-/g, ' '));
  }
}

export default StringUtil;