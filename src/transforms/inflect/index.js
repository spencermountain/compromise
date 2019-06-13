const suffixes = require('./01-suffixes')
const addE = /(x|ch|sh|s|z)$/

const trySuffix = function(str) {
  let c = str[str.length - 1]
  if (suffixes.hasOwnProperty(c) === true) {
    for (let i = 0; i < suffixes[c].length; i += 1) {
      let reg = suffixes[c][i][0]
      if (reg.test(str) === true) {
        return str.replace(reg, suffixes[c][i][1])
      }
    }
  }
  return null
}

/** Turn a singular noun into a plural
 * assume the given string is singular
 */
const pluralize = function(str = '') {
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
