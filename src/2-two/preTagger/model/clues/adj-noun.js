import adj from './_adj.js'
import noun from './_noun.js'
// the commercial market
// watching the commercial

const misc = {
  beforeTags: {
    Determiner: undefined //the premier university
  }
}
const clue = {
  beforeTags: Object.assign({}, adj.beforeTags, noun.beforeTags, misc.beforeTags),
  afterTags: Object.assign({}, adj.afterTags, noun.afterTags),
  beforeWords: Object.assign({}, adj.beforeWords, noun.beforeWords, {
    // are representative
    are: 'Adjective', is: 'Adjective', was: 'Adjective', be: 'Adjective',
  }),
  afterWords: Object.assign({}, adj.afterWords, noun.afterWords),
}
export default clue