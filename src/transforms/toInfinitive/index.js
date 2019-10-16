const rules = require('./_transform')
const guess = require('./_guess')

/** it helps to know what we're conjugating from */
const guessTense = function(str) {
  let three = str.substr(str.length - 3)
  if (guess.hasOwnProperty(three) === true) {
    return guess[three]
  }
  let two = str.substr(str.length - 2)
  if (guess.hasOwnProperty(two) === true) {
    return guess[two]
  }
  let one = str.substr(str.length - 1)
  if (one === 's') {
    return 'PresentTense'
  }
  return null
}
module.exports = guessTense

const toInfinitive = function(str) {
  let tense = guessTense(str)
  // console.log(tense, str)
  if (tense && rules[tense]) {
    for (let i = 0; i < rules[tense].length; i++) {
      const rule = rules[tense][i]
      if (rule.reg.test(str) === true) {
        return str.replace(rule.reg, rule.to)
      }
    }
  }
  return str
}
module.exports = toInfinitive
