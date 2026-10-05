// Local rule aliases; public tag names and ambiguity switches stay unchanged.
const tags = {
  NN: 'Noun',
  Sing: 'Singular',
  Plur: 'Plural',
  Prop: 'ProperNoun',
  Pron: 'Pronoun',
  Poss: 'Possessive',
  Det: 'Determiner',
  Adj: 'Adjective',
  Comp: 'Comparative',
  Sup: 'Superlative',
  Adv: 'Adverb',
  V: 'Verb',
  Inf: 'Infinitive',
  Pres: 'PresentTense',
  Past: 'PastTense',
  Fut: 'FutureTense',
  Ger: 'Gerund',
  Part: 'Participle',
  Cop: 'Copula',
  Aux: 'Auxiliary',
  Mod: 'Modal',
  Pass: 'Passive',
  Imp: 'Imperative',
  Neg: 'Negative',
  PhrV: 'PhrasalVerb',
  Prt: 'Particle',
  Prep: 'Preposition',
  Conj: 'Conjunction',
  QW: 'QuestionWord',
  Refl: 'Reflexive',
  Pers: 'Person',
  First: 'FirstName',
  Last: 'LastName',
  Org: 'Organization',
  Dem: 'Demonym',
  Hon: 'Honorific',
  Expr: 'Expression',
  Card: 'Cardinal',
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
