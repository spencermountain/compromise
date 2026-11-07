import eachTerm from './_lib.js'
import alias from './alias.js'
import normal from './normal/index.js'
import machine from './machine.js'
import freq from './freq.js'
import offset from './offset.js'
import index from './reindex.js'
import wordCount from './wordCount.js'

// cheat-method for a quick loop
const termLoop = (view, fn) => eachTerm(view.docs, term => fn(term, view.world))

const methods = {
  alias: (view) => termLoop(view, alias),
  machine: (view) => termLoop(view, machine),
  normal: (view) => termLoop(view, normal),
  freq,
  offset,
  index,
  wordCount,
}
export default methods
