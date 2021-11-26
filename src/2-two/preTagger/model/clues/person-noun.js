import person from './_person.js'
import noun from './_noun.js'

// 'babling brook' vs 'brook sheilds'

const clue = {
  beforeTags: Object.assign({}, person.beforeTags, noun.beforeTags),
  afterTags: Object.assign({}, person.afterTags, noun.afterTags),
  beforeWords: Object.assign({}, person.beforeWords, noun.beforeWords, { i: 'Infinitive', we: 'Infinitive' }),
  afterWords: Object.assign({}, person.afterWords, noun.afterWords),
}
export default clue