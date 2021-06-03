const cleanup = require('./cleanup')
const doUnicode = require('./unicode')
const doAcronyms = require('./acronyms')

const normalize = function (str) {
  str = cleanup(str)
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = doUnicode(str)
  str = doAcronyms(str)
  return str
}
module.exports = normalize
