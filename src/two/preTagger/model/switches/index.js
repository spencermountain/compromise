import data from './_data.js'
import { unpack } from 'efrt'
import person from './person.js'
import adj from './adjective.js'
import date from './date.js'
import verb from './verb.js'
// unpack our lexicon of ambiguous-words
// (found in ./lib/switches/)

const nn = 'Singular'
const vb = 'Infinitive'
const jj = 'Adjective'
const g = 'Gerund'
const pst = 'PastTense'

const switches = {
  // Singular - Infinitive -
  // date, call, claim, flash
  nounVerb: {
    before: Object.assign({}, verb.before, {
      Determiner: nn, //the date
      Possessive: nn, //his date
      Noun: nn, //nasa funding
    }),
    beforeWords: Object.assign({}, verb.beforeWords, {
      was: nn, //was time
      is: nn, //
    }),
    after: Object.assign({}, verb.after, {
      Value: nn, //date nine  -?
      Modal: nn, //date would
      Copula: nn, //fear is
    }),
    afterWords: Object.assign({}, verb.afterWords, {
      of: nn, //date of birth (preposition)
    }),
    fallback: vb,
  },

  // adjective - gerund - 'shocking'
  adjGerund: {
    before: {
      Copula: jj, //is shocking
      Verb: g, // loves shocking
      Adverb: g, //quickly shocking
      Preposition: g, //by insulting
      Conjunction: g, //to insulting
    },
    after: {
      Adverb: g, //shocking quickly
      Possessive: g, //shocking spencer's
      ProperNoun: g, //shocking spencer
      Pronoun: g, //shocking him
      Determiner: g, //shocking the
      Copula: g, //shocking is
      Preposition: g, //dashing by
      Conjunction: g, //insulting to
      Noun: jj, //shocking ignorance, rallying cry, revealing clue
    },
    beforeWords: Object.assign({}, adj.beforeWords, {
      been: g,
    }),
    afterWords: {
      too: jj, //insulting too
      also: jj, //insulting too
      you: g, //telling you
    },
    fallback: jj,
  },

  // adjective - pastTense - 'damaged'
  adjPast: {
    before: Object.assign({}, adj.before, {
      Adverb: pst, //quickly detailed
      Pronoun: pst, //he detailed
    }),
    after: {
      Noun: jj, //detailed plan
      Possessive: pst, //hooked him
      Pronoun: pst, //hooked me
      Determiner: pst, //hooked the
      Adjective: jj, //intoxicated little
    },
    beforeWords: Object.assign({}, adj.beforeWords, {
      quickly: pst, //
    }),
    afterWords: {
      by: pst, //damaged by
      back: pst, //charged back
      out: pst, //charged out
      in: pst, //crowded in
      up: pst, //heated up
      down: pst, //hammered down
    },
    fallback: jj,
  },

  personNoun: {
    before: Object.assign({}, person.before),
    after: Object.assign({}, person.after),
    beforeWords: Object.assign({}, person.beforeWords),
    afterWords: Object.assign({}, person.afterWords),
    fallback: nn,
  },

  personDate: {
    before: Object.assign({}, person.before, date.before),
    after: Object.assign({}, person.after, date.after),
    beforeWords: Object.assign({}, person.beforeWords, date.beforeWords),
    afterWords: Object.assign({}, person.afterWords, date.afterWords),
    fallback: nn,
  },

  personVerb: {
    before: Object.assign({}, person.before, verb.before),
    after: Object.assign({}, person.after, verb.after),
    beforeWords: Object.assign({}, person.beforeWords, verb.beforeWords),
    afterWords: Object.assign({}, person.afterWords, verb.afterWords),
    fallback: vb,
  },
}
// add compressed word-data
Object.keys(switches).forEach(k => {
  switches[k].words = unpack(data[k])
})

export default switches
