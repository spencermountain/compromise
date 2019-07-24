/* global define */
const build = require('./01-tokenizer')
const version = require('./_version')
const World = require('./World/World')
const Doc = require('./Doc/Doc')

//blast-out our word-lists, just once
let world = new World()

/** parse and tag text into a compromise object  */
const nlp = function(text = '') {
  let list = build.fromText(text)
  let doc = new Doc(list, null, world)
  doc.tagger()
  return doc
}

/** parse text into a compromise object, without running POS-tagging */
nlp.tokenize = function(text = '') {
  let list = build.fromText(text)
  let doc = new Doc(list, null, world)
  return doc
}

/** mix in a compromise-plugin */
nlp.extend = function(fn) {
  fn(Doc)
}

/** make a deep-copy of the library state */
nlp.clone = function() {
  world = world.clone()
  return this
}

/** re-generate a Doc object from .json() results */
nlp.fromJSON = function(json) {
  let list = build.fromJSON(json)
  return new Doc(list, null, world)
}

/** log our decision-making for debugging */
nlp.verbose = function(bool = true) {
  world.verbose(bool)
}

/** current version of the library */
nlp.version = version

//and then all the exports..
if (typeof self !== 'undefined') {
  self.nlp = nlp // Web Worker
}
if (typeof window !== 'undefined') {
  window.nlp = nlp // Browser
}
if (typeof global !== 'undefined') {
  global.nlp = nlp // NodeJS
}
if (typeof define === 'function' && define.amd) {
  define(nlp) //don't forget amd!
}

module.exports = nlp
