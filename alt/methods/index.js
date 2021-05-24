module.exports = {
  // terms
  normalize: require('./terms/normalize'),
  // nouns
  toPlural: require('./nouns/toPlural'),
  toSingular: require('./nouns/toSingular'),
  // verbs
  toInfinitive: require('./verbs/toInfinitive'),
  conjugate: str => {},
  // adjectives
  toSuperlative: require('./adjectives/toSuperlative'),
  toComparative: require('./adjectives/toComparative'),
}
