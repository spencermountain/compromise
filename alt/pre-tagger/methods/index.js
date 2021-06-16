module.exports = {
  // tagger methods
  checkLexicon: require('./tagger/01-lexicon'),
  checkSuffix: require('./tagger/02-suffix'),
  checkRegex: require('./tagger/03-regex'),
  checkCase: require('./tagger/04-case'),
  checkAcronym: require('./tagger/05-acronym'),
  checkPrefix: require('./tagger/06-prefix'),
  nounFallback: require('./tagger/07-fallback'),
  fillTags: require('./tagger/08-fillTags'),

  // lexicon creation methods
  nounToPlural: require('./transform/nouns/toPlural'),
  nounToSingular: require('./transform/nouns/toSingular'),

  verbToInfinitive: require('./transform/verbs/toInfinitive'),
  verbConjugate: require('./transform/verbs/conjugate'),

  adjToSuperlative: require('./transform/adjectives/toSuperlative'),
  adjToComparative: require('./transform/adjectives/toComparative'),

  // expand: require('./lexicon/'),
}
