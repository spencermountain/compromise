let doc = Object.assign({}, require('./doc'), require('./transform'), require('./match'))

let plugins = Object.assign({}, require('./plugins'))

plugins.numbers = require('./plugins/numbers')
plugins.nouns = require('./plugins/nouns')
plugins.sentences = require('./plugins/sentences')
plugins.verbs = require('./plugins/verbs')

module.exports = {
  doc: doc,
  subset: plugins,
}
