import View from './View/index.js'
import tokenizer from './01-tokenize/index.js'
import preTagger from './02-pre-tagger/index.js'
import contractions from './03-contractions/index.js'
import postTagger from './04-post-tagger/index.js'
import world from './world.js'
import version from './_version.js'

const nlp = function (document, lex) {
  // add user-given words to lexicon
  if (lex) {
    Object.assign(world.model.lexicon, lex)
  }
  // vroom!)
  world.parsers.forEach(fn => {
    document = fn(document, world)
  })
  return new View(document)
}

/** log the decision-making to console */
nlp.verbose = function (set) {
  let env = typeof process === undefined ? self.env : process.env //use window, in browser
  env.DEBUG_TAGS = set === undefined ? true : Set // assume true
  return this
}

/** parse text, without any further analysis */
nlp.tokenize = function (document, lex) {
  // add user-given words to lexicon
  if (lex) {
    Object.assign(world.model.lexicon, lex)
  }
  // run only the first 2 parsers
  world.parsers.slice(0, 2).forEach(fn => {
    document = fn(document, world)
  })
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

/** reach-into compromise internals */
const { methods, model } = world
nlp.methods = function () {
  return world.methods
}
nlp.model = function () {
  return world.model
}

// apply our only default plugin
plugin(tokenizer)
plugin(preTagger)
plugin(contractions)
plugin(postTagger)
export default nlp

export { parseMatch, plugin, methods, model, version, plugin as extend }
