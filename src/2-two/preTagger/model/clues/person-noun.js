import person from './_person.js'
import noun from './_noun.js'

// 'babling brook' vs 'brook sheilds'

const clue = {
  beforeTags: { ...noun.beforeTags, ...person.beforeTags },
  afterTags: { ...noun.afterTags, ...person.afterTags },
  beforeWords: { ...noun.beforeWords, ...person.beforeWords, i: 'Infinitive', we: 'Infinitive' },
  afterWords: { ...noun.afterWords, ...person.afterWords },
}
export default clue