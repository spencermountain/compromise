import compile from './_lib.js'
import byWord from './by-word.js'
import byTag from './by-tag.js'
import bySwitch from './by-switch.js'

export default {
  two: {
    leftRight: {
      byWord: compile(byWord),
      byTag: compile(byTag),
      bySwitch: compile(bySwitch),
    },
  },
}
// console.log(compile(byWord).like[2])
