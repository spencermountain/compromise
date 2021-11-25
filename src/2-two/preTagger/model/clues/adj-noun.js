import adj from './_adj.js'
import noun from './_noun.js'
// the commercial market
// watching the commercial
export default {
  beforeTags: Object.assign({}, adj.beforeTags, noun.beforeTags),
  afterTags: Object.assign({}, adj.afterTags, noun.afterTags),
  beforeWords: Object.assign({}, adj.beforeWords, noun.beforeWords),
  afterWords: Object.assign({}, adj.afterWords, noun.afterWords),
}