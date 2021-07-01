import View from './View/index.js'
import world from './world.js'
import version from './_version.js'
import tokenizer from './tokenize/index.js'
import contractions from './contractions/index.js'

const nlp = function (document, lex) {
  if (lex) {
    Object.assign(world.model.lexicon, lex)
  }
  // run all the given parsers
  world.parsers.forEach(fn => {
    document = fn(document, world)
  })
  return new View(document)
}

/** extend compromise functionality */
const plugin = function (fn) {
  fn(world, View)
  return this
}
nlp.plugin = plugin

/** pre-parse any match statements */
const parseMatch = function (str) {
  return world.methods.parseMatch(str)
}
nlp.parseMatch = parseMatch

// only add these ones
plugin(tokenizer)
plugin(contractions)
const { methods, model } = world

export default nlp

export { version, methods, model, parseMatch }
