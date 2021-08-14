import easyMode from './01-easy.js'
import matcher from './02-matcher.js'
import fallback from './03-fallback.js'
/* Chunks:
    Noun
    .Verb
    Adjective
    Preposition
*/

const findChunks = function (document, world) {
  easyMode(document)
  matcher(document, world)
  fallback(document, world)
}
export default findChunks
