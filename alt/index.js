const View = require('./View')
// our default plugins
const tokenize = require('./tokenize')
const contractions = require('./contractions')
const tagger = require('./tagger')

const nlp = function (input) {
  return new View(input)
}

/** extend compromise functionality */
nlp.plugin = function (fn) {
  let { methods, model, process } = new View()
  fn(methods, model, process)
  return this
}
/** reach-into compromise internal */
nlp.methods = function (fn) {
  let { methods } = new View()
  return methods
}

// apply our only default plugin
nlp.plugin(tokenize)
nlp.plugin(contractions)
nlp.plugin(tagger)

module.exports = nlp
