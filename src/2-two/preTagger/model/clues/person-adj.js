import person from './_person.js'
import adj from './_adj.js'

// 'rusty nail'   -  'rusty smith'
const clues = {
  beforeTags: { ...person.beforeTags, ...adj.beforeTags },
  afterTags: { ...person.afterTags, ...adj.afterTags },
  beforeWords: { ...person.beforeWords, ...adj.beforeWords },
  afterWords: { ...person.afterWords, ...adj.afterWords },
}
export default clues