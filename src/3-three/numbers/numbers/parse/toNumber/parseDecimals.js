import words from './data.js'

//concatenate into a string with leading '0.'
const parseDecimals = function (arr) {
  let str = '0.'
  for (let i = 0; i < arr.length; i++) {
    const w = arr[i]
    if (Object.hasOwn(words.small, w) === true) {
      str += words.small[w]
    } else if (/^[0-9]$/.test(w) === true) {
      str += w
    } else {
      return 0
    }
  }
  return parseFloat(str)
}

export default parseDecimals
