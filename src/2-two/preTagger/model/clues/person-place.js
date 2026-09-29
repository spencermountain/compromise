import person from './_person.js'
const p = 'Place'

// 'paris hilton' vs 'paris france'
const place = {
  beforeTags: {
    Place: p
  },
  afterTags: {
    Place: p,
    Abbreviation: p
  },
  beforeWords: {
    in: p,
    by: p,
    near: p,
    from: p,
    to: p,
  },
  afterWords: {
    in: p,
    by: p,
    near: p,
    from: p,
    to: p,
    government: p,
    council: p,
    region: p,
    city: p,
  },
}

const clue = {
  beforeTags: { ...place.beforeTags, ...person.beforeTags },
  afterTags: { ...place.afterTags, ...person.afterTags },
  beforeWords: { ...place.beforeWords, ...person.beforeWords },
  afterWords: { ...place.afterWords, ...person.afterWords },
}
export default clue