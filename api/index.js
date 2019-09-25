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

let plugins = Object.assign({}, require('./plugins'))
plugins.numbers = require('./plugins/numbers')
plugins.nouns = require('./plugins/nouns')
plugins.sentences = require('./plugins/sentences')
plugins.verbs = require('./plugins/verbs')
plugins.contractions = require('./plugins/contractions')

module.exports = {
  doc: doc,
  subset: plugins,
}
