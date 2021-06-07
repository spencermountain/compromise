const View = require('./View')
// our default plugins
const tokenize = require('./tokenize')
const contractions = require('./contractions')
const preTagger = require('./pre-tagger')
let { methods, model, parsers } = require('./world')

const nlp = function (input) {
  return new View(input, null, methods, model, parsers)
}

/** extend compromise functionality */
nlp.plugin = function (fn) {
  fn(methods, model, parsers)
  return this
}
/** reach-into compromise internal */
nlp.methods = function () {
  return methods
}
/** peek-into compromise data */
nlp.model = function () {
  return model
}

// apply our only default plugin
nlp.plugin(tokenize)
nlp.plugin(preTagger)
nlp.plugin(contractions)

module.exports = nlp
