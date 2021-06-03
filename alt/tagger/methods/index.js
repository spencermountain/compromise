module.exports = {
  nounToPlural: require('./expand/nouns/toPlural'),
  nounToSingular: require('./expand/nouns/toSingular'),
  verbToInfinitive: require('./expand/verbs/toInfinitive'),
  verbConjugate: str => {},
  adjToSuperlative: require('./expand/adjectives/toSuperlative'),
  adjToComparative: require('./expand/adjectives/toComparative'),
}
