const View = require('./View')
// our default plugins
const tokenize = require('./tokenize')
const contractions = require('./contractions')
const preTagger = require('./pre-tagger')
const postTagger = require('./post-tagger')
const parseMatch = require('./View/match/match-syntax')
let { methods, model, parsers } = require('./world')

const nlp = function (document, lex) {
  if (lex) {
    Object.assign(model.lexicon, lex)
  }
  // vroom!)
  parsers.forEach(fn => {
    document = fn(document, methods, model)
  })
  return new View(document)
}

/** parse text, without any further analysis */
nlp.tokenize = function (str) {
  let document = tokenize(str)
  document = contractions(document)
  return new View(document)
}
/** pre-parse any match statements */
nlp.parseMatch = function (str) {
  return parseMatch(str)
}

/** extend compromise functionality */
nlp.plugin = function (fn) {
  fn(methods, model, parsers, View)
  return this
}
nlp.extend = nlp.plugin

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
nlp.plugin(postTagger)

module.exports = nlp
