module.exports = {
  _cache: {
    abbreviations: {},
  },
  contractions: require('./contractions'),
  irregulars: {
    plurals: require('./irregulars/plurals'),
    conjugations: require('./irregulars/conjugations'),
  },
  lexicon: require('./lexicon'),
  suffixes: require('./suffixes'),
  tags: require('./tags'),
}
