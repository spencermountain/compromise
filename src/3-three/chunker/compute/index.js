import easyMode from './01-easy.js'
import byNeighbour from './02-neighbours.js'
import matcher from './03-matcher.js'
import fallback from './04-fallback.js'
import fixUp from './05-fixUp.js'
/* Chunks:
    Noun
    Verb
    Adjective
    Pivot
*/

const findChunks = function (view) {
  const { docs, world } = view
  easyMode(docs)
  byNeighbour(docs)
  matcher(view, docs, world)
  fallback(docs, world)
  fixUp(docs, world)
}
export default { chunks: findChunks }
