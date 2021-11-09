import nounVerb from './noun-verb.js'
import adjGerund from './adj-gerund.js'
import adjPast from './adj-past.js'
import adjPresent from './adj-present.js'
import personNoun from './person-noun.js'
import personDate from './person-date.js'
import personVerb from './person-verb.js'
import gerundNoun from './gerund-noun.js'

const merge = (a, b) => {
  a = a || {}
  b = b || {}
  return Object.assign({}, a, b)
}

const switches = {
  nounVerb,
  adjGerund,
  adjPast,
  adjPresent,
  personNoun,
  personDate,
  personVerb,
  gerundNoun,
}
// add compressed word-data
Object.keys(switches).forEach(k => {
  let [a, b] = switches[k].clues
  switches[k] = {
    beforeTags: merge(a.beforeTags, b.beforeTags),
    afterTags: merge(a.afterTags, b.afterTags),
    ownTags: merge(a.ownTags, b.ownTags),
    beforeWords: merge(a.beforeWords, b.beforeWords),
    afterWords: merge(a.afterWords, b.afterWords),
    words: switches[k].words,
    fallback: switches[k].fallback,
  }
})

export default switches
