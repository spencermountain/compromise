import data from './_data.js'
import { unpack } from 'efrt'
// unpack our lexicon of ambiguous-words
// (found in ./lib/switches/)

const vb = 'Infinitive'
const nn = 'Singular'

const jj = 'Adjective'
const g = 'Gerund'
const pst = 'PastTense'

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
      Noun: nn, //nasa funding
    },
    beforeWords: {
      i: vb, //i date
      we: vb, //we date
      you: vb, //you date
      they: vb, //they date
      to: vb, //to date
      one: nn, //one hope
      please: vb, //please check
    },
    after: {
      Determiner: vb, //flash the
      Adverb: vb, //date quickly
      Possessive: vb, //date his
      // Noun: vb, //date spencer
      Preposition: vb, //date around, dump onto, grumble about
      Conjunction: vb, // dip to, dip through
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
    beforeWords: {
      been: g,
      // really shocking
      really: jj,
      quite: jj,
      very: jj,
      totally: jj,
      extremely: jj,
      so: jj,
      also: jj,
      too: jj, //too insulting
      it: jj, //find it insulting
      but: jj, //nothing but frustrating
    },
    afterWords: {
      too: jj, //insulting too
      also: jj, //insulting too
      you: g, //telling you
    },
    fallback: jj,
  },

  // adjective - pastTense - 'damaged'
  adjPast: {
    before: {
      Determiner: jj, //the detailed
      Copula: jj, //is detailed
      Possessive: jj, //spencer's detailed
      Adverb: pst, //quickly detailed
      Pronoun: pst, //he detailed
    },
    after: {
      Noun: jj, //detailed plan
      Possessive: pst, //hooked him
      Pronoun: pst, //hooked me
      Determiner: pst, //hooked the
      Adjective: jj, //intoxicated little
    },
    beforeWords: {
      seem: jj, //seem prepared
      seemed: jj,
      seems: jj,
      feel: jj, //feel prepared
      feels: jj,
      felt: jj,
      appear: jj,
      appears: jj,
      appeared: jj,
      really: jj, //really damaged
      quite: jj,
      well: jj,
      very: jj,
      deeply: jj,
      profoundly: jj,
      extremely: jj,
      so: jj,
      badly: jj,
      mostly: jj,
      also: jj,
      too: jj, //too insulting
      quickly: pst, //
    },
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
}
// add compressed word-data
Object.keys(switches).forEach(k => {
  switches[k].words = unpack(data[k])
})

export default switches
