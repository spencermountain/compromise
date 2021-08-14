import easyMode from './01-easy.js'
import matcher from './02-matcher.js'
import fallback from './03-fallback.js'
import fixUp from './04-fixUp.js'
/* Chunks:
    Noun
    .Verb
    Adjective
    Preposition
*/

const findChunks = function (document, world) {
  easyMode(document)
  matcher(document, world)
  matcher(document, world) //run it 2nd time
  fallback(document, world)
  fixUp(document, world)
}
export default findChunks
