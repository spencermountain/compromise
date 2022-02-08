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
  beforeTags: Object.assign({}, place.beforeTags, person.beforeTags),
  afterTags: Object.assign({}, place.afterTags, person.afterTags),
  beforeWords: Object.assign({}, place.beforeWords, person.beforeWords),
  afterWords: Object.assign({}, place.afterWords, person.afterWords),
}
export default clue