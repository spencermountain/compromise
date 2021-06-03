module.exports = {
  _cache: {},
  contractions: require('../contractions/model/mapping'),
  tags: require('./tags'),
  irregular: {
    plurals: require('./model/irregulars/plurals'),
    conjugations: require('./model/irregulars/conjugations'),
  },
  tagger: {
    lexicon: require('./model/lexicon'),
    suffixes: require('./model/suffixes'),
  },
}
