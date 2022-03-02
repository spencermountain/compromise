import cleanup from './01-cleanup.js'
import doUnicode from './02-unicode.js'
import doAcronyms from './03-acronyms.js'

const normalize = function (term, world) {
  let str = term.text || ''
  str = cleanup(str)
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = doUnicode(str, world)
  str = doAcronyms(str)
  term.normal = str
}
export default normalize
