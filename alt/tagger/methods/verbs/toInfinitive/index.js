const rules = require('./_transform')
const guess = require('./_guess')

/** it helps to know what we're conjugating from */
const guessTense = function (str) {
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

const toInfinitive = function (str, world, tense) {
  if (!str) {
    return ''
  }
  //1. look at known irregulars
  if (world.words.hasOwnProperty(str) === true) {
    let irregs = world.irregulars.verbs
    let keys = Object.keys(irregs)
    for (let i = 0; i < keys.length; i++) {
      let forms = Object.keys(irregs[keys[i]])
      for (let o = 0; o < forms.length; o++) {
        if (str === irregs[keys[i]][forms[o]]) {
          return keys[i]
        }
      }
    }
  }

  // give'r!
  tense = tense || guessTense(str)
  if (tense && rules[tense]) {
    for (let i = 0; i < rules[tense].length; i++) {
      const rule = rules[tense][i]
      if (rule.reg.test(str) === true) {
        // console.log(rule.reg)
        return str.replace(rule.reg, rule.to)
      }
    }
  }
  return str
}
module.exports = toInfinitive
