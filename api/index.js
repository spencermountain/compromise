let doc = Object.assign(
  {},
  require('./insert'),
  require('./loops'),
  require('./match'),
  require('./out'),
  require('./tag'),
  require('./transform'),
  require('./utils')
)

let plugins = Object.assign({}, require('./plugins'))
plugins.numbers = require('./plugins/numbers')
plugins.nouns = require('./plugins/nouns')
plugins.sentences = require('./plugins/sentences')
plugins.verbs = require('./plugins/verbs')

module.exports = {
  doc: doc,
  subset: plugins,
}
