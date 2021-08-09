import View from './View.js'
import world from '../lib/world.js'
import version from '../lib/_version.js'

const nlp = function (input, lex) {
  const { methods, parsers } = world
  if (lex) {
    // add user-given words to lexicon
    if (methods.tag.addToLexicon) {
      methods.tag.addToLexicon(lex, world)
    }
  }
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  doc.compute(parsers)
  return doc
}

/** log the decision-making to console */
nlp.verbose = function (set) {
  let env = typeof process === undefined ? self.env : process.env //use window, in browser
  env.DEBUG_TAGS = set === undefined ? true : Set // assume true
  return this
}

/** pre-parse any match statements */
nlp.parseMatch = world.methods.one.parseMatch

/** extend compromise functionality */
nlp.plugin = function (fn) {
  fn(world, View)
  return this
}

/** reach-into compromise internals */
const { methods, model } = world
nlp.methods = () => world.methods
nlp.model = () => world.model

nlp.version = version

/** don't run the POS-tagger */
nlp.tokenize = function (input, lex) {
  // add user-given words to lexicon
  if (lex) {
    Object.assign(world.model.two.lexicon, lex)
  }
  // only run the first parser
  let document = methods.one.tokenize(input, world)
  return new View(document)
}

// apply our only default plugins
export default nlp
const { parseMatch, plugin } = nlp
export { parseMatch, plugin, methods, model, version, plugin as extend }
