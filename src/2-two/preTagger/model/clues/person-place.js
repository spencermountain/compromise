import person from './_person.js'

// 'paris hilton' vs 'paris france'
const place = {
  beforeTags: {
    Place: 'Place'
  },
  afterTags: {
    Place: 'Place',
    Abbreviation: 'Place'
  },
  beforeWords: {
    in: 'Place',
    near: 'Place',
  },
  afterWords: {
    in: 'Place',
    near: 'Place',
    government: 'Place',
    council: 'Place',
    region: 'Place',
    city: 'Place',
  },
}

const clue = {
  beforeTags: Object.assign({}, person.beforeTags, place.beforeTags),
  afterTags: Object.assign({}, person.afterTags, place.afterTags),
  beforeWords: Object.assign({}, person.beforeWords, place.beforeWords),
  afterWords: Object.assign({}, person.afterWords, place.afterWords),
}
export default clue