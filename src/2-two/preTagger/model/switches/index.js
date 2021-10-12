import data from './_data.js'
import { unpack } from 'efrt'
import person from './clues/person.js'
import adj from './clues/adjective.js'
import date from './clues/date.js'
import verb from './clues/verb.js'
import noun from './clues/noun.js'
import gerund from './clues/gerund.js'
import past from './clues/past.js'
// unpack our lexicon of ambiguous-words
// (found in ./lib/switches/)

const merge = (a, b) => {
  a = a || {}
  b = b || {}
  return Object.assign({}, a, b)
}

const switches = {
  // Singular - Infinitive -
  // date, call, claim, flash
  nounVerb: {
    parts: [verb, noun],
    fallback: 'Infinitive',
  },

  // adjective - gerund - 'shocking'
  adjGerund: {
    parts: [adj, gerund],
    fallback: 'Adjective',
    // before: {
    //   Copula: 'Adjective', //is shocking
    // },
  },

  // adjective - pastTense - 'damaged'
  adjPast: {
    parts: [adj, past],
    fallback: 'Adjective',
  },
  personNoun: {
    parts: [noun, person],
    fallback: 'Singular',
  },
  personDate: {
    parts: [person, date],
    fallback: 'Singular',
  },
  personVerb: {
    parts: [person, verb],
    fallback: 'Singular',
  },
}
// add compressed word-data
Object.keys(switches).forEach(k => {
  let [a, b] = switches[k].parts
  switches[k] = {
    before: merge(a.before, b.before),
    after: merge(a.after, b.after),
    ownTags: merge(a.ownTags, b.ownTags),
    beforeWords: merge(a.beforeWords, b.beforeWords),
    afterWords: merge(a.afterWords, b.afterWords),
    words: unpack(data[k]),
    fallback: switches[k].fallback,
  }
})

export default switches
