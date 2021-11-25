import person from './_person.js'
import noun from './_noun.js'

// 'babling brook' vs 'brook sheilds'

export default {
  beforeTags: Object.assign({}, person.beforeTags, noun.beforeTags),
  afterTags: Object.assign({}, person.afterTags, noun.afterTags),
  beforeWords: Object.assign({}, person.beforeWords, noun.beforeWords),
  afterWords: Object.assign({}, person.afterWords, noun.afterWords),
}