import alias from './alias.js'
import normal from './normal/index.js'
import machine from './machine.js'
import freq from './freq.js'
import offset from './offset.js'
import index from './reindex.js'
import wordCount from './wordCount.js'
// import compute from './_ids.js'

// cheat-method for a quick loop
const termLoop = function (view, fn) {
  let docs = view.docs
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      fn(docs[i][t], view.world)
    }
  }
}

const methods = {
  alias: (view) => termLoop(view, alias),
  normal: (view) => termLoop(view, normal),
  machine: (view) => termLoop(view, machine),
  // ids: compute,
  freq,
  offset,
  index,
  wordCount,
}
export default methods
