const rules = require('./_rules')
const addE = /(x|ch|sh|s|z)$/

const trySuffix = function (str) {
  let c = str[str.length - 1]
  if (rules.hasOwnProperty(c) === true) {
    for (let i = 0; i < rules[c].length; i += 1) {
      let reg = rules[c][i][0]
      if (reg.test(str) === true) {
        return str.replace(reg, rules[c][i][1])
      }
    }
  }
  return null
}

/** Turn a singular noun into a plural
 * assume the given string is singular
 */
const pluralize = function (str = '', world) {
  let irregulars = world.irregulars.nouns

  // check irregulars list
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }

  //we have some rules to try-out
  let plural = trySuffix(str)
  if (plural !== null) {
    return plural
  }
  //like 'church'
  if (addE.test(str)) {
    return str + 'es'
  }
  // ¯\_(ツ)_/¯
  return str + 's'
}
module.exports = pluralize
