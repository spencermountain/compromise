import { Adj } from '../../tagSet/_lib.js'
import adj from './_adj.js'
import verb from './_verb.js'

// 'would mean' vs 'is mean'
const misc = {
  afterTags: {
    Noun: Adj,//ruling party
    Conjunction: undefined //clean and excellent
  }
}
const clue = {
  beforeTags: {
    ...adj.beforeTags,
    ...verb.beforeTags,
    // always clean
    Adverb: undefined, Negative: undefined
  },
  afterTags: { ...adj.afterTags, ...verb.afterTags, ...misc.afterTags },
  beforeWords: {
    ...adj.beforeWords,
    ...verb.beforeWords,
    // have seperate contracts
    have: undefined, had: undefined, not: undefined,
    //went wrong, got wrong
    went: Adj, goes: Adj, got: Adj,
    // be sure
    be: Adj
  },
  afterWords: {
    ...adj.afterWords,
    ...verb.afterWords,
    to: undefined,//slick to the touch
    as: Adj,//pale as
  },
}
// console.log(clue.beforeWords)
// console.log(clue)
export default clue