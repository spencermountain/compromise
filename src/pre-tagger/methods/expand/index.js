const fancyThings = {
  // add plural forms of singular nouns
  Singular: (word, lex, methods, model) => {
    let plural = methods.preTagger.nounToPlural(word, model)
    lex[plural] = lex[plural] || 'Plural'
  },
  // superlative/comparative forms for adjectives
  Comparable: (word, lex, methods, model) => {
    // fast -> fastest
    let superlative = methods.preTagger.adjToSuperlative(word, model)
    lex[superlative] = lex[superlative] || 'Superlative'
    // fast -> faster
    let comparative = methods.preTagger.adjToComparative(word, model)
    lex[comparative] = lex[comparative] || 'Comparative'
    // overwrite
    lex[word] = 'Adjective'
  },
  // 'german' -> 'germains'
  Demonym: (word, lex, methods, model) => {
    let plural = methods.preTagger.nounToPlural(word, model)
    lex[plural] = lex[plural] || ['Demonym', 'Plural']
  },
  // conjugate all forms of these verbs
  Infinitive: (word, lex, methods, model) => {
    let all = methods.preTagger.verbConjugate(word, model)
    Object.entries(all).forEach(a => {
      lex[a[1]] = lex[a[1]] || a[0]
    })
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

// derive clever things from our lexicon key-value pairs
// this method runs as the pre-tagger plugin gets loaded
const grow = function (model, methods) {
  let lex = model.lexicon
  console.log('start:', Object.keys(lex).length)
  let _multi = model._multiCache

  // go through each word in the lex:
  Object.keys(lex).forEach(word => {
    // cache multi-word terms
    let split = word.split(/ /)
    if (split.length > 1) {
      _multi.add(split[0])
    }
    let tag = lex[word]
    if (fancyThings.hasOwnProperty(tag) === true) {
      fancyThings[tag](word, lex, methods, model)
    }
  })
  console.log('after:', Object.keys(lex).length)
  // console.log(methods.preTagger)
  console.log(lex)
}
export default grow
