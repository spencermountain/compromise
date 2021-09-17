import data from './_data.js'
import { unpack } from 'efrt'
// unpack our lexicon of ambiguous-words
// (found in ./lib/switches/)

const vb = 'Infinitive'
const nn = 'Singular'

const jj = 'Adjective'
// const g = 'Gerund'
// const pst = 'PastTense'

const switches = {
  // Singular - Infinitive -
  // date, call, claim, flash
  nounVerb: {
    before: {
      Modal: vb, //would date
      Adverb: vb, //quickly date
      Negative: vb, //not date
      Determiner: nn, //the date
      Possessive: nn, //his date
    },
    beforeWords: {
      i: vb, //i date
      we: vb, //we date
      you: vb, //you date
      they: vb, //they date
      to: vb, //to date
      one: nn, //one hope
    },
    after: {
      Determiner: vb, //flash the
      Adverb: vb, //date quickly
      Possessive: vb, //date his
      Noun: vb, //date spencer
      Preposition: vb, //date around, dump onto, grumble about
      Conjunction: nn, // dip to, dip through
      Value: nn, //date nine  -?
      Modal: nn, //date would
      Copula: nn, //fear is
    },
    afterWords: {
      the: vb, //echo the
      me: vb, //date me
      you: vb, //date you
      of: nn, //date of birth (preposition)
    },
    fallback: vb,
  },

  // adjective - gerund - 'shocking'
  adjGerund: {
    before: {},
    after: {},
    beforeWords: {},
    afterWords: {},
    fallback: jj,
  },

  // adjective - pastTense - 'damaged'
  adjPast: {
    before: {},
    after: {},
    beforeWords: {},
    afterWords: {},
    fallback: jj,
  },
}
// add compressed word-data
Object.keys(switches).forEach(k => {
  switches[k].words = unpack(data[k])
})

export default switches
