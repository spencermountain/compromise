import person from './_person.js'
import verb from './_verb.js'

// 'rob the store'   -  'rob lowe'
const clues = {
  beforeTags: Object.assign({}, person.beforeTags, verb.beforeTags),
  afterTags: Object.assign({}, person.afterTags, verb.afterTags),
  beforeWords: Object.assign({}, person.beforeWords, verb.beforeWords),
  afterWords: Object.assign({}, person.afterWords, verb.afterWords),
}
export default clues