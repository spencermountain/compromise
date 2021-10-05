import alias from './01-alias/index.js'
import normal from './02-normal/index.js'
import machine from './03-machine/index.js'
import freq from './freq.js'
import { offset, index } from './offset.js'
import wordCount from './wordCount.js'

// cheat-method for a quick loop
const termLoop = function (docs, fn, world) {
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      fn(docs[i][t], world)
    }
  }
}
const methods = {
  alias: (docs, world) => termLoop(docs, alias, world),
  normal: (docs, world) => termLoop(docs, normal, world),
  machine: (docs, world) => termLoop(docs, machine, world),
  freq,
  offset,
  index,
  wordCount,
}
export default methods
