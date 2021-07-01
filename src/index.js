import View from './View/index.js'
import tokenizer from './tokenize/index.js'
import preTagger from './pre-tagger/index.js'
import contractions from './contractions/index.js'
import postTagger from './post-tagger/index.js'
import world from './world.js'
import version from './_version.js'

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
const tokenize = function (str) {
  let document = tokenizer(str)
  document = contractions(document)
  return new View(document)
}

/** pre-parse any match statements */
const parseMatch = function (str) {
  return world.methods.parseMatch(str)
}
nlp.parseMatch = parseMatch

/** extend compromise functionality */
const plugin = function (fn) {
  fn(world, View)
  return this
}
nlp.plugin = plugin

/** reach-into compromise internal */
const methods = function () {
  return world.methods
}
nlp.methods = methods

/** peek-into compromise data */
const model = function () {
  return world.model
}
nlp.model = model

// apply our only default plugin
plugin(tokenizer)
plugin(preTagger)
plugin(contractions)
plugin(postTagger)
export default nlp

export { tokenize, parseMatch, plugin, methods, model, version, plugin as extend }
