import View from './API/View.js'
import tmp from './API/world.js'
import version from './_version.js'
import extend from './API/extend.js'
import clone from './API/clone.js'
import { verbose, compile } from './API/_lib.js'

let world = Object.assign({}, tmp)

const nlp = function (input, lex) {
  const { methods, hooks } = world
  if (lex) {
    nlp.addWords(lex)
  }
  //assume ./01-tokenize is installed
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  doc.world = world
  doc.compute(hooks)
  return doc
}

/** log the decision-making to console */
nlp.verbose = verbose

/** pre-parse any match statements */
nlp.parseMatch = function (str) {
  return world.methods.one.parseMatch(str)
}

/** pre-compile a list of matches to lookup */
nlp.compile = compile

/** add words to assume by prefix in typeahead */
// nlp.typeAhead = function (lex = {}) {
//   // interpret array as input
//   if (Object.prototype.toString.call(lex) === '[object Array]') {
//     lex = lex.reduce((h, k) => {
//       h[k] = true
//       return h
//     }, {})
//   }
//   world.model.one.typeahead = lex
//   return this
// }

/** extend compromise functionality */
nlp.plugin = function (plugin) {
  extend(plugin, world, View, this)
  return this
}
nlp.extend = nlp.plugin

/** reach-into compromise internals */
nlp.world = () => world

/** current library release version */
nlp.version = version

/** insert new words/phrases into the lexicon */
nlp.addWords = function (words) {
  const { methods, model } = world
  if (!words) {
    return
  }
  // add some words to our lexicon
  if (!methods.two.expandLexicon) {
    Object.assign(model.two.lexicon, words) //no fancy-business
  } else {
    // expand it, if appropriate
    let { lex, _multi } = methods.two.expandLexicon(words, world)
    Object.assign(model.two.lexicon, lex)
    Object.assign(model.two._multiCache, _multi)
  }
}

/** don't run the POS-tagger */
nlp.tokenize = function (input, lex) {
  const { methods, compute } = world
  // add user-given words to lexicon
  if (lex) {
    nlp.addWords(lex)
  }
  // run the tokenizer
  let document = methods.one.tokenize(input, world)
  let doc = new View(document)
  // give contractions a shot, at least
  if (compute.contractions) {
    doc.compute(['alias', 'normal', 'machine', 'contractions']) //run it if we've got it
  }
  return doc
}

/** deep-clone the library's model*/
nlp.fork = function (str) {
  world = Object.assign({}, world)
  world.methods = Object.assign({}, world.methods)
  world.model = clone(world.model)
  world.model.forked = str
  return nlp
}

// some helper methods
nlp.model = () => world.model
nlp.methods = () => world.methods
nlp.hooks = () => world.hooks

// apply our only default plugins
const { plugin, parseMatch } = nlp
export default nlp
export { plugin, version, plugin as extend }
