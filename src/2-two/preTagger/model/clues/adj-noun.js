import merge from './_lib.js'
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
  },
  beforeWords: {
    // are representative
    ...tagWords('are is was be', Adj),
    // phrasals
    off: Adj,//start off fine
    out: Adj,//comes out fine
  },
}
export default merge(adj, noun, misc)
