import View from './api/View.js'
import world from './api/world.js'
import version from '../lib/_version.js'
import extend from './api/extend.js'

const nlp = function (input, lex) {
  //assume ./one is installed
  const { methods, hooks } = world
  if (lex) {
    // add user-given words to lexicon
    if (methods.two.addToLexicon) {
      methods.two.addToLexicon(lex, world)
    }
  }
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  doc.compute(hooks)
  return doc
}

/** log the decision-making to console */
nlp.verbose = function (set) {
  let env = typeof process === undefined ? self.env : process.env //use window, in browser
  env.DEBUG_TAGS = set === 'tagger' || set === true ? true : ''
  env.DEBUG_MATCH = set === 'match' || set === true ? true : ''
  return this
}

/** pre-parse any match statements */
nlp.parseMatch = function (str) {
  return world.methods.one.parseMatch(str)
}

/** extend compromise functionality */
nlp.plugin = function (plugin) {
  extend(plugin, world, this)
  return this
}
nlp.extend = nlp.plugin

/** reach-into compromise internals */
nlp.world = () => world

nlp.version = version

/** don't run the POS-tagger */
nlp.tokenize = function (input, lex) {
  const { methods, model, compute } = world
  // add user-given words to lexicon
  if (lex) {
    Object.assign(model.two.lexicon, lex) //no fancy business
  }
  // run the tokenizer
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  // give contractions a shot, at least
  if (compute.contractions) {
    doc.compute('contractions') //run it if we've got it
  }
  return doc
}

// apply our only default plugins
export default nlp
const { parseMatch, plugin } = nlp
export { parseMatch, plugin, version, plugin as extend }
