import person from './_person.js'
import verb from './_verb.js'
import noun from './_noun.js'

// 'rob the store'   -  'rob lowe'
// can be a noun too - 'losing hope'
const clues = {
  beforeTags: { ...noun.beforeTags, ...person.beforeTags, ...verb.beforeTags },
  afterTags: { ...noun.afterTags, ...person.afterTags, ...verb.afterTags },
  beforeWords: { ...noun.beforeWords, ...person.beforeWords, ...verb.beforeWords },
  afterWords: { ...noun.afterWords, ...person.afterWords, ...verb.afterWords },
}
export default clues