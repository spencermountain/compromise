import tagWords from '../_lib.js'
import { NN, Adj } from '../../tagSet/_lib.js'
import adj from './_adj.js'
import noun from './_noun.js'
// the commercial market
// watching the commercial

const misc = {
  beforeTags: {
    Determiner: undefined, //the premier university
    Cardinal: NN,//1950 convertable
    PhrasalVerb: Adj//starts out fine
  },
  afterTags: {
    // Pronoun: 'Noun'//as an adult i
  }
}
const clue = {
  beforeTags: { ...adj.beforeTags, ...noun.beforeTags, ...misc.beforeTags },
  afterTags: { ...adj.afterTags, ...noun.afterTags, ...misc.afterTags },
  beforeWords: {
    ...adj.beforeWords,
    ...noun.beforeWords,
    // are representative
    ...tagWords('are is was be', Adj),
    // phrasals
    off: Adj,//start off fine
    out: Adj,//comes out fine
  },
  afterWords: { ...adj.afterWords, ...noun.afterWords },
}
export default clue