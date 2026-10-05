// Local rule aliases; public tag names and ambiguity switches stay unchanged.
const tags = {
  NN: 'Noun',
  NNs: 'Singular',
  Plur: 'Plural',
  NNP: 'ProperNoun',
  PRP: 'Pronoun',
  Poss: 'Possessive',
  Det: 'Determiner',
  JJ: 'Adjective',
  JJR: 'Comparative',
  JJS: 'Superlative',
  RB: 'Adverb',
  V: 'Verb',
  Inf: 'Infinitive',
  Pres: 'PresentTense',
  Past: 'PastTense',
  Fut: 'FutureTense',
  VBG: 'Gerund',
  Part: 'Participle',
  Cop: 'Copula',
  Aux: 'Auxiliary',
  MD: 'Modal',
  Pass: 'Passive',
  Imp: 'Imperative',
  Neg: 'Negative',
  PhrV: 'PhrasalVerb',
  RP: 'Particle',
  IN: 'Preposition',
  Conj: 'Conjunction',
  QW: 'QuestionWord',
  Refl: 'Reflexive',
  Pers: 'Person',
  FN: 'FirstName',
  LN: 'LastName',
  Org: 'Organization',
  Dem: 'Demonym',
  Hon: 'Honorific',
  Expr: 'Expression',
  CD: 'Cardinal',
  Ord: 'Ordinal',
  Num: 'NumericValue',
  TxtNum: 'TextValue',
  NumRange: 'NumberRange',
  Frac: 'Fraction',
}

const expandTags = (value, bare = false) => {
  if (Array.isArray(value)) {
    return value.map(tag => expandTags(tag, bare))
  }
  if (typeof value !== 'string') {
    return value
  }
  const pattern = bare ? /#?[a-z][a-z0-9]*/gi : /#[a-z][a-z0-9]*/gi
  return value.replace(pattern, token => {
    const prefix = token.startsWith('#') ? '#' : ''
    const name = token.slice(prefix.length)
    return prefix + (Object.hasOwn(tags, name) ? tags[name] : name)
  })
}

export default expandTags
