const View = require('./View')
// our default plugins
const tokenize = require('./tokenize')
const contractions = require('./contractions')
const preTagger = require('./pre-tagger')
let { methods, model, parsers } = require('./world')

const nlp = function (document, pointer) {
  // vroom!)
  parsers.forEach(fn => {
    document = fn(document, methods, model)
  })
  return new View(document, pointer)
}

/** extend compromise functionality */
nlp.plugin = function (fn) {
  fn(methods, model, parsers, View)
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
