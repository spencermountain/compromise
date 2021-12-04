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
Object.defineProperty(nlp, '_world', {
  value: world,
  writable: true,
})

/** don't run the POS-tagger */
nlp.tokenize = function (input, lex) {
  const { methods, compute } = this._world
  // add user-given words to lexicon
  if (lex) {
    nlp.addWords(lex)
  }
  // run the tokenizer
  let document = methods.one.tokenize(input, this._world)
  let doc = new View(document)
  // give contractions a shot, at least
  if (compute.contractions) {
    doc.compute(['alias', 'normal', 'machine', 'contractions']) //run it if we've got it
  }
  return doc
}

/** deep-clone the library's model*/
nlp.fork = function (str) {
  this._world = Object.assign({}, this._world)
  this._world.methods = Object.assign({}, this._world.methods)
  this._world.model = clone(this._world.model)
  this._world.model.fork = str
  return this
}

/** extend compromise functionality */
nlp.plugin = function (plugin) {
  extend(plugin, this._world, View, this)
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
nlp.world = function () {
  return this._world
}
nlp.model = function () {
  return this._world.model
}
nlp.methods = function () {
  return this._world.methods
}
nlp.hooks = function () {
  return this._world.hooks
}

// apply our only default plugins
export default nlp
