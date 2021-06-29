const View = require('./View')
// our default plugins
const tokenize = require('./tokenize')
const contractions = require('./contractions')
const preTagger = require('./pre-tagger')
const postTagger = require('./post-tagger')
// const parseMatch = require('./methods/parseMatch')
let world = require('./world')

const nlp = function (document, lex) {
  if (lex) {
    Object.assign(world.model.lexicon, lex)
  }
  // vroom!)
  world.parsers.forEach(fn => {
    document = fn(document, world)
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
  return world.methods.parseMatch(str)
}

/** extend compromise functionality */
nlp.plugin = function (fn) {
  fn(world, View)
  return this
}
nlp.extend = nlp.plugin

/** reach-into compromise internal */
nlp.methods = function () {
  return world.methods
}
/** peek-into compromise data */
nlp.model = function () {
  return world.model
}

// apply our only default plugin
nlp.plugin(tokenize)
nlp.plugin(preTagger)
nlp.plugin(contractions)
// nlp.plugin(postTagger)

module.exports = nlp
