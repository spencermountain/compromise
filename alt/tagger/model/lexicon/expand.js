// const methods = require('../../methods')

module.exports = {
  Unit: (lex, w) => {
    lex[w] = ['Abbreviation', 'Unit']
  },
  Cardinal: (lex, w) => {
    lex[w] = ['TextValue', 'Cardinal']
  },
  TextOrdinal: (lex, w) => {
    lex[w] = ['Ordinal', 'TextValue']
    lex[w + 's'] = ['TextValue', 'Fraction'] // add 'millionths'
  },
  // add plural/singular forms
  Singular: (lex, w) => {
    lex[w] = 'Singular'
    let plural = methods.noun.toPlural(w)
    lex[plural] = lex[plural] || 'Plural'
  },
  // conjugate these verbs
  Infinitive: (lex, w) => {
    lex[w] = 'Infinitive'
    let conj = methods.verb.conjugate(w)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]]
      lex[str] = lex[str] || tags[i] // only if it's safe
    }
  },
  // conjugate other Adjectival forms
  Comparable: (lex, w) => {
    lex[w] = 'Comparable'
    let conj = methods.adjective.toComparable(w)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let word = conj[tags[i]]
      lex[word] = lex[word] || tags[i] // only if it's safe
    }
  },
  //conjugate phrasal-verbs
  PhrasalVerb: (lex, w) => {
    // whole thing
    lex[w] = ['PhrasalVerb', 'Infinitive']
    //add original form
    let words = w.split(' ')
    //conjugate first word
    let conj = methods.verb.conjugate(words[0])
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]] + ' ' + words[1]
      lex[str] = lex[str] || ['PhrasalVerb', tags[i]]
      // world.hasCompound[conj[tags[i]]] = true
    }
  },
  // inflect our demonyms - 'germans'
  Demonym: (lex, w, world) => {
    lex[w] = 'Demonym'
    let plural = methods.noun.toPlural(w, world)
    lex[plural] = lex[plural] || ['Demonym', 'Plural'] // only if it's safe
  },
}
