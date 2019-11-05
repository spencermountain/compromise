let doc = Object.assign(
  {},
  require('./01-utils'),
  require('./02-accessors'),
  require('./03-match'),
  require('./04-case'),
  require('./05-whitespace'),
  require('./06-tag'),
  require('./07-loops'),
  require('./08-insert'),
  require('./09-out'),
  require('./10-split'),
  require('./11-selectors')
)

// let plugins = Object.assign({}, require('./plugins'))
// plugins.numbers = require('./plugins/numbers')
// plugins.sentences = require('./plugins/sentences')

let subclass = {
  contractions: require('./subclass/01-contractions'),
  nouns: require('./subclass/02-nouns'),
  verbs: require('./subclass/03-verbs'),
}

module.exports = {
  doc: doc,
  subclass: subclass,
  main: require('./_constructor'),
}
