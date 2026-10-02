import compile from './_lib.js'
import byWord from './by-word.js'
import byTag from './by-tag.js'

export default {
  two: {
    leftRight: {
      byWord: compile(byWord),
      byTag: compile(byTag),
    },
  },
}
