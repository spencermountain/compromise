// sweep a by-length affix table, longest first - returns the matching prefix or suffix
const findAffix = (str = '', table = [], max, min, fromStart) => {
  const len = str.length
  for (let i = max; i >= min; i -= 1) {
    const affix = fromStart ? str.substring(0, i) : str.substring(len - i, len)
    if (Object.hasOwn(table[affix.length], affix) === true) {
      return affix
    }
  }
  return null
}
export default findAffix
