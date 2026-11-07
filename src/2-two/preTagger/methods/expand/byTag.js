import { Plur, Sup, Comp, Adj, Fut, Phrasal, Inf, Card, Ord, Frac, TxtNum, Prop } from '../../tagSet/_lib.js'

// add a derived form, unless the lexicon already knows it
const addForm = (lex, model, form, tag) => {
  if (!model.one.lexicon[form]) {
    lex[form] ||= tag
  }
}
// add the plural form of a noun
const addPlural = (word, lex, methods, model, tag) => {
  addForm(lex, model, methods.two.transform.noun.toPlural(word, model), tag)
}

// transformations to make on our lexicon
export default {
  // add plural forms of singular nouns
  Singular: (word, lex, methods, model) => {
    addPlural(word, lex, methods, model, Plur)
  },
  // 'lawyer', 'manager' plural forms
  Actor: (word, lex, methods, model) => {
    addPlural(word, lex, methods, model, [Plur, 'Actor'])
  },

  // superlative/ comparative forms for adjectives
  Comparable: (word, lex, methods, model) => {
    const { toSuperlative, toComparative } = methods.two.transform.adjective
    // fast -> fastest
    addForm(lex, model, toSuperlative(word, model), Sup)
    // fast -> faster
    addForm(lex, model, toComparative(word, model), Comp)
    // overwrite
    lex[word] = Adj
  },

  // 'german' -> 'germans'
  Demonym: (word, lex, methods, model) => {
    const plural = methods.two.transform.noun.toPlural(word, model)
    lex[plural] ||= ['Demonym', Plur]
  },

  // conjugate all forms of these verbs
  Infinitive: (word, lex, methods, model) => {
    const already = model.one.lexicon
    const all = methods.two.transform.verb.conjugate(word, model)
    Object.entries(all).forEach(a => {
      if (!already[a[1]] && !lex[a[1]] && a[0] !== Fut) {
        lex[a[1]] = a[0]
      }
    })
  },

  // 'walk up' should conjugate, too
  PhrasalVerb: (word, lex, methods, model) => {
    const already = model.one.lexicon
    lex[word] = [Phrasal, Inf]
    const _multi = model.one._multiCache
    const [inf, rest] = word.split(' ')
    // add root verb
    if (!already[inf]) {
      lex[inf] ||= Inf
    }
    // conjugate it
    const all = methods.two.transform.verb.conjugate(inf, model)
    delete all.FutureTense
    Object.entries(all).forEach(a => {
      // not 'walker up', or 'had taken up'
      if (a[0] === 'Actor' || a[1] === '') {
        return
      }
      // add the root verb, alone
      if (!lex[a[1]] && !already[a[1]]) {
        lex[a[1]] = a[0]
      }
      _multi[a[1]] = 2
      const str = a[1] + ' ' + rest
      lex[str] ||= [a[0], Phrasal]
    })
  },

  // expand 'million'
  Multiple: (word, lex) => {
    lex[word] = ['Multiple', Card]
    // 'millionth'
    lex[word + 'th'] = ['Multiple', Ord]
    // 'millionths'
    lex[word + 'ths'] = ['Multiple', Frac]
  },
  // expand number-words
  Cardinal: (word, lex) => {
    lex[word] = [TxtNum, Card]
  },

  // 'millionth'
  Ordinal: (word, lex) => {
    lex[word] = [TxtNum, Ord]
    lex[word + 's'] = [TxtNum, Frac]
  },
  // 'thames'
  Place: (word, lex) => {
    lex[word] = ['Place', Prop]
  },
  // 'ontario'
  Region: (word, lex) => {
    lex[word] = ['Region', Prop]
  },
}
