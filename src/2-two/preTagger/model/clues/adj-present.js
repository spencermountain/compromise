import adj from './_adj.js'
import verb from './_verb.js'

// 'would mean' vs 'is mean'
export default {
  beforeTags: Object.assign({}, adj.beforeTags, verb.beforeTags),
  afterTags: Object.assign({}, adj.afterTags, verb.afterTags),
  beforeWords: Object.assign({}, adj.beforeWords, verb.beforeWords),
  afterWords: Object.assign({}, adj.afterWords, verb.afterWords),
}