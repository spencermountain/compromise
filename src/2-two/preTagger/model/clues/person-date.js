import tagWords from '../_lib.js'
import person from './_person.js'
import tags from '../../tagSet/aliases.js'

const { Month: m, Person: p } = tags

// 'april o'neil'  -  'april 1st'

const month = {
  beforeTags: {
    Date: m,
    Value: m,
  },
  afterTags: {
    Date: m,
    Value: m,
  },
  beforeWords: {
    // 5th of april; this april
    ...tagWords(
      'by in on during after before between until til sometime of this next last previous ' +
      'following',
      m
    ),
    with: p,
    // for: p,
  },
  afterWords: tagWords(
    // june the 4th
    'sometime in of until the', m,
  ),
}
export default {
  beforeTags: { ...person.beforeTags, ...month.beforeTags },
  afterTags: { ...person.afterTags, ...month.afterTags },
  beforeWords: { ...person.beforeWords, ...month.beforeWords },
  afterWords: { ...person.afterWords, ...month.afterWords },
}
