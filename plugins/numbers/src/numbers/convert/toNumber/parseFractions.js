const words = require('./data')

//concatenate into a string with leading '0.'
const parseFractions = function (arr) {
  // console.log('parsing fraction:')
  // console.log(arr)
  let multiplier = 1
  for (let i = 0; i < arr.length; i++) {
    let w = arr[i]
    if (words.fractions.hasOwnProperty(w) === true) {
      multiplier *= words.fractions[w]
    } else if (words.fractions.hasOwnProperty(w.slice(0, -1)) === true) {
      multiplier *= words.fractions[w.slice(0, -1)]
    } else if (words.ones.hasOwnProperty(w) === true) {
      multiplier *= words.ones[w]
    } else if (words.teens.hasOwnProperty(w) === true) {
      multiplier *= words.teens[w]
    } else if (words.tens.hasOwnProperty(w) === true) {
      multiplier *= words.tens[w]
    } else if (/^[0-9]$/.test(w) === true) {
      multiplier *= w
    } else {
      return 0
    }
  }
  return multiplier
}

module.exports = parseFractions
