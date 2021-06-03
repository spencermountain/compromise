module.exports = {
  term: {
    normalize: require('./normalize'),
  },
  tokenize: {
    sentences: require('./sentences'),
    terms: require('./terms'),
    whitespace: require('./whitespace'),
  },
}
