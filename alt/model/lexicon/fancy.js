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
  Singular: (lex, w, world) => {
    lex[w] = 'Singular'
    let plural = world.transforms.toPlural(w, world)
    lex[plural] = lex[plural] || 'Plural'
  },
  // conjugate these verbs
  Infinitive: (lex, w, world) => {
    lex[w] = 'Infinitive'
    let conj = world.transforms.conjugate(w, world)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]]
      lex[str] = lex[str] || tags[i] // only if it's safe
    }
  },
  // conjugate other Adjectival forms
  Comparable: (lex, w, world) => {
    lex[w] = 'Comparable'
    let conj = world.transforms.adjectives(w)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let word = conj[tags[i]]
      lex[word] = lex[word] || tags[i] // only if it's safe
    }
  },
  //conjugate phrasal-verbs
  PhrasalVerb: (lex, w, world) => {
    // whole thing
    lex[w] = ['PhrasalVerb', 'Infinitive']
    //add original form
    let words = w.split(' ')
    // lex[words[0]] = lex[words[0]] || 'Infinitive'
    // //conjugate first word
    let conj = world.transforms.conjugate(words[0], world)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]] + ' ' + words[1]
      lex[str] = lex[str] || ['PhrasalVerb', tags[i]]
      world.hasCompound[conj[tags[i]]] = true
    }
  },
  // inflect our demonyms - 'germans'
  Demonym: (lex, w, world) => {
    lex[w] = 'Demonym'
    let plural = world.transforms.toPlural(w, world)
    lex[plural] = lex[plural] || ['Demonym', 'Plural'] // only if it's safe
  },
}
