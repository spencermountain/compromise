const d = 'Date'

export default {
  beforeTags: {
    Date: d,
    Value: d,
  },
  afterTags: {
    Date: d,
    Value: d,
  },
  beforeWords: {
    by: d,
    in: d,
    during: d,
    after: d,
    until: d,
    til: d,
    sometime: d,
    of: d, //5th of april
    this: d, //this april
    next: d,
    last: d,
  },
  afterWords: {
    sometime: d,
    in: d,
    until: d,
    the: d, //june the 4th
  },
}
