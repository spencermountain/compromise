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
    by: m,
    in: m,
    on: m,
    during: m,
    after: m,
    before: m,
    between: m,
    until: m,
    til: m,
    sometime: m,
    of: m, //5th of april
    this: m, //this april
    next: m,
    last: m,
    previous: m,
    following: m,
    with: p,
    // for: p,
  },
  afterWords: {
    sometime: m,
    in: m,
    of: m,
    until: m,
    the: m, //june the 4th
  },
}
export default {
  beforeTags: { ...person.beforeTags, ...month.beforeTags },
  afterTags: { ...person.afterTags, ...month.afterTags },
  beforeWords: { ...person.beforeWords, ...month.beforeWords },
  afterWords: { ...person.afterWords, ...month.afterWords },
}
