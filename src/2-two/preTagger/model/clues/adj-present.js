import merge from './_lib.js'
import { Adj } from '../../tagSet/_lib.js'
import adj from './_adj.js'
import verb from './_verb.js'

// 'would mean' vs 'is mean'
const misc = {
  beforeTags: {
    // always clean
    Adverb: undefined, Negative: undefined
  },
  afterTags: {
    Noun: Adj,//ruling party
    Conjunction: undefined //clean and excellent
  },
  beforeWords: {
    // have seperate contracts
    have: undefined, had: undefined, not: undefined,
    //went wrong, got wrong
    went: Adj, goes: Adj, got: Adj,
    // be sure
    be: Adj
  },
  afterWords: {
    to: undefined,//slick to the touch
    as: Adj,//pale as
  },
}
export default merge(adj, verb, misc)
