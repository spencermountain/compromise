import cleanup from './cleanup.js'
import doUnicode from './unicode.js'
import doAcronyms from './acronyms.js'

const normalize = function (term) {
  let str = term.text || ''
  str = cleanup(str)
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = doUnicode(str)
  str = doAcronyms(str)
  term.normal = str
}
export default normalize
