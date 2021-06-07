const suffixes = require('./suffixes')
const posMap = {
  pr: 'PresentTense',
  pa: 'PastTense',
  gr: 'Gerund',
  prt: 'Participle',
  ar: 'Actor',
}

const doTransform = function (str, obj) {
  let found = {}
  let keys = Object.keys(obj.repl)
  for (let i = 0; i < keys.length; i += 1) {
    let pos = keys[i]
    found[posMap[pos]] = str.replace(obj.reg, obj.repl[pos])
  }
  return found
}

//look at the end of the word for clues
const checkSuffix = function (str = '') {
  let c = str[str.length - 1]
  if (suffixes.hasOwnProperty(c) === true) {
    for (let r = 0; r < suffixes[c].length; r += 1) {
      const reg = suffixes[c][r].reg
      if (reg.test(str) === true) {
        return doTransform(str, suffixes[c][r])
      }
    }
  }
  return {}
}
module.exports = checkSuffix
