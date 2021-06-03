module.exports = {
  term: {
    normalize: require('../../tokenize/methods/normalize'),
  },
  noun: {
    toPlural: require('./nouns/toPlural'),
    toSingular: require('./nouns/toSingular'),
  },
  verb: {
    toInfinitive: require('./verbs/toInfinitive'),
    conjugate: str => {},
  },
  adjective: {
    toSuperlative: require('./adjectives/toSuperlative'),
    toComparative: require('./adjectives/toComparative'),
  },
}
