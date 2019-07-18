const regexes = require('./suffixes/regex')
const suffixList = require('./suffixes/suffixList')

const suffixRegexes = function(term, world) {
  let str = term.normal
  let char = str[str.length - 1]
  if (regexes.hasOwnProperty(char) === true) {
    let regs = regexes[char]
    for (let r = 0; r < regs.length; r += 1) {
      if (regs[r][0].test(str) === true) {
        term.tagSafe(regs[r][1], `endsWith ${char} #${r}`, world)
        break
      }
    }
  }
}

//sweep-through all suffixes
const knownSuffixes = function(term, world) {
  const len = term.normal.length
  let max = 7
  if (len <= max) {
    max = len - 1
  }
  for (let i = max; i > 1; i -= 1) {
    let str = term.normal.substr(len - i, len)
    if (suffixList[str.length].hasOwnProperty(str) === true) {
      let tag = suffixList[str.length][str]
      term.tagSafe(tag, 'suffix -' + str, world)
      break
    }
  }
}

//all-the-way-down!
const checkRegex = function(term, world) {
  suffixRegexes(term, world)
  knownSuffixes(term, world)
}
module.exports = checkRegex
