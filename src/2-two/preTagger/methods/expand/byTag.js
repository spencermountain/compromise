// transformations to make on our lexicon
export default {
  // add plural forms of singular nouns
  Singular: (word, lex, methods, model) => {
    let plural = methods.two.transform.nounToPlural(word, model)
    lex[plural] = lex[plural] || 'Plural'
  },

  // superlative/ comparative forms for adjectives
  Comparable: (word, lex, methods, model) => {
    // fast -> fastest
    let superlative = methods.two.transform.adjToSuperlative(word, model)
    lex[superlative] = lex[superlative] || 'Superlative'
    // fast -> faster
    let comparative = methods.two.transform.adjToComparative(word, model)
    lex[comparative] = lex[comparative] || 'Comparative'
    // overwrite
    lex[word] = 'Adjective'
  },

  // 'german' -> 'germains'
  Demonym: (word, lex, methods, model) => {
    let plural = methods.two.transform.nounToPlural(word, model)
    lex[plural] = lex[plural] || ['Demonym', 'Plural']
  },

  // conjugate all forms of these verbs
  Infinitive: (word, lex, methods, model) => {
    let all = methods.two.transform.verbConjugate(word, model)
    Object.entries(all).forEach(a => {
      lex[a[1]] = lex[a[1]] || a[0]
    })
  },

  // 'walk up' should conjugate, too
  PhrasalVerb: (word, lex, methods, model) => {
    let already = model.one.lexicon
    lex[word] = ['PhrasalVerb', 'Infinitive']
    let _multi = model.one._multiCache
    let [inf, rest] = word.split(' ')
    // add root verb
    if (!already[inf]) {
      lex[inf] = lex[inf] || 'Infinitive'
    }
    // conjugate it
    let all = methods.two.transform.verbConjugate(inf, model)
    Object.entries(all).forEach(a => {
      // not 'walker up', or 'had taken up'
      if (a[0] === 'Actor' || a[1] === '') {
        return
      }
      // add the root verb, alone
      if (!lex[a[1]] && !already[a[1]]) {
        lex[a[1]] = a[0]
      }
      _multi[a[1]] = true
      let str = a[1] + ' ' + rest
      lex[str] = lex[str] || [a[0], 'PhrasalVerb']
    })
  },

  // expand 'million'
  Multiple: (word, lex) => {
    lex[word] = ['Multiple', 'Cardinal']
    // 'millionth'
    lex[word + 'th'] = ['Multiple', 'Ordinal']
    // 'millionths'
    lex[word + 'ths'] = ['Multiple', 'Fraction']
  },
  // expand number-words
  Cardinal: (word, lex) => {
    lex[word] = ['TextValue', 'Cardinal']
  },

  // 'millionth'
  Ordinal: (word, lex) => {
    lex[word] = ['TextValue', 'Ordinal']
    lex[word + 's'] = ['TextValue', 'Fraction']
  },
}
