import cleanup from './cleanup.js'
import doUnicode from './unicode.js'
import doAcronyms from './acronyms.js'

const normalize = function (str) {
  str = cleanup(str)
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = doUnicode(str)
  str = doAcronyms(str)
  return str
}
export default normalize
