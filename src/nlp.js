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

/** extend compromise functionality */
nlp.plugin = function (plugin) {
  extend(plugin, world, View, this)
  return this
}
nlp.extend = nlp.plugin

/** log the decision-making to console */
nlp.verbose = verbose
/** pre-compile a list of matches to lookup */
nlp.compile = compile
/** current library release version */
nlp.version = version
/** reach-into compromise internals */
nlp.world = () => world
nlp.model = () => world.model
nlp.methods = () => world.methods
nlp.hooks = () => world.hooks

// apply our only default plugins
export default nlp
