import words from './data.js'

// append the decimal digits to the whole number, as a string
// (6 + 0.94 is 6.9399999999999995)
const parseDecimals = function (whole, arr) {
  let str = ''
  for (let i = 0; i < arr.length; i++) {
    const w = arr[i]
    if (Object.hasOwn(words.small, w)) {
      str += words.small[w]
    } else if (/^[0-9]$/.test(w)) {
      str += w
    } else {
      return whole
    }
  }
  if (str === '') {
    return whole
  }
  if (Number.isSafeInteger(whole) && whole >= 0) {
    return Number(`${whole}.${str}`)
  }
  return whole + parseFloat('0.' + str)
}

export default parseDecimals
