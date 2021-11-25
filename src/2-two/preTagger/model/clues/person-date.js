import person from './_person.js'

// 'april o'neil'  -  'april 1st'

const m = 'Month'
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
    during: m,
    after: m,
    until: m,
    til: m,
    sometime: m,
    of: m, //5th of april
    this: m, //this april
    next: m,
    last: m,
  },
  afterWords: {
    sometime: m,
    in: m,
    until: m,
    the: m, //june the 4th
  },
}
export default {
  beforeTags: Object.assign({}, person.beforeTags, month.beforeTags),
  afterTags: Object.assign({}, person.afterTags, month.afterTags),
  beforeWords: Object.assign({}, person.beforeWords, month.beforeWords),
  afterWords: Object.assign({}, person.afterWords, month.afterWords),
}