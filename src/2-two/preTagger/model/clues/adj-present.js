import adj from './_adj.js'
import verb from './_verb.js'

// 'would mean' vs 'is mean'
const misc = {
  afterTags: {
    Noun: 'Adjective',//ruling party
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
    went: 'Adjective', goes: 'Adjective', got: 'Adjective',
    // be sure
    be: 'Adjective'
  },
  afterWords: {
    ...adj.afterWords,
    ...verb.afterWords,
    to: undefined,//slick to the touch
    as: 'Adjective',//pale as
  },
}
// console.log(clue.beforeWords)
// console.log(clue)
export default clue