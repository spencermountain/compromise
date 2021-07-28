import normalize from './normal/index.js'
import alias from './alias.js'

const machine = function (term) {
  let str = term.implicit || term.normal || term.text
  str = str.replace(/'s$/, '') //no apostrophes
  str = str.replace(/[-]/, '') //no hyphens
  term.machine = str
}

const termLoop = function (docs, method, model) {
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      method(docs[i][t], model)
    }
  }
}

// compute methods should set term metadata, and return nothing
const compute = {
  // text formats
  normal: docs => termLoop(docs, normalize),
  // like 'normal', but no hyphens or apostrophes
  machine: docs => termLoop(docs, machine),
  // known word swaps
  alias: (docs, model) => termLoop(docs, alias, model),

  //
  freq: docs => {},
  offset: docs => {},
  wordCount: docs => {},
  cache: docs => {},
  // contractions: docs => {},
}
export default compute
