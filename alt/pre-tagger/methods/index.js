module.exports = {
  // tagger methods
  checkLexicon: require('./tagger/01-lexicon'),
  checkSuffix: require('./tagger/02-suffix'),
  checkRegex: require('./tagger/03-regex'),

  // lexicon creation methods
  nounToPlural: require('./lexicon/nouns/toPlural'),
  nounToSingular: require('./lexicon/nouns/toSingular'),

  verbToInfinitive: require('./lexicon/verbs/toInfinitive'),
  verbConjugate: require('./lexicon/verbs/conjugate'),

  adjToSuperlative: require('./lexicon/adjectives/toSuperlative'),
  adjToComparative: require('./lexicon/adjectives/toComparative'),
}
