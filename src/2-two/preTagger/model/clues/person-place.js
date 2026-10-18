import tagWords from '../_lib.js'
import person from './_person.js'
import tags from '../../tagSet/aliases.js'

const { Place: p } = tags

// 'paris hilton' vs 'paris france'
const place = {
  beforeTags: {
    Place: p
  },
  afterTags: {
    Place: p,
    Abbreviation: p
  },
  beforeWords: tagWords('in by near from to', p),
  afterWords: tagWords('in by near from to government council region city', p),
}

const clue = {
  beforeTags: { ...place.beforeTags, ...person.beforeTags },
  afterTags: { ...place.afterTags, ...person.afterTags },
  beforeWords: { ...place.beforeWords, ...person.beforeWords },
  afterWords: { ...place.afterWords, ...person.afterWords },
}
export default clue