import cleanup from './cleanup.js'
import doUnicode from './unicode.js'
import doAcronyms from './acronyms.js'
const hasSlash = /\//

const normalize = function (str) {
  str = cleanup(str)
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = doUnicode(str)
  str = doAcronyms(str)
  // support aliases for slashes
  if (hasSlash.test(str)) {
    str = str.split(hasSlash)[0]
  }
  return str
}
export default normalize
