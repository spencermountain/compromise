let doc = Object.assign(
  {},
  require('./01-utils'),
  require('./02-accessors'),
  require('./03-case'),
  require('./04-whitespace'),
  require('./05-insert'),
  require('./06-out'),
  require('./07-loops'),
  require('./08-match'),
  require('./09-tag'),
  require('./10-selectors')
)

// let plugins = Object.assign({}, require('./plugins'))
// plugins.numbers = require('./plugins/numbers')
// plugins.sentences = require('./plugins/sentences')

let subclass = {
  contractions: require('./11-contractions'),
  nouns: require('./12-nouns'),
  verbs: require('./13-verbs'),
}

module.exports = {
  doc: doc,
  subclass: subclass,
  main: require('./_constructor'),
}
