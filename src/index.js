const tokenize = require('./01-tokenizer')
const version = require('./_version')
const World = require('./World/World')
const Doc = require('./Doc/Doc')

const globalWorld = new World()

function instance() {
  //blast-out our word-lists, just once
  let world = globalWorld.clone()

  /** parse and tag text into a compromise object  */
  const nlp = function(text = '', lexicon) {
    if (lexicon) {
      world.addWords(lexicon)
    }
    let list = tokenize.fromText(text, world)
    let doc = new Doc(list, null, world)
    doc.tagger()
    return doc
  }

  /** parse text into a compromise object, without running POS-tagging */
  nlp.tokenize = function(text = '', lexicon) {
    if (lexicon) {
      world.addWords(lexicon)
    }
    let list = tokenize.fromText(text, world)
    let doc = new Doc(list, null, world)
    return doc
  }

  /** mix in a compromise-plugin */
  nlp.extend = function(fn) {
    fn(Doc, world)
    return this
  }

  /** make a deep-copy of the library state */
  nlp.clone = function() {
    world = world.clone()
    return this
  }

  /** re-generate a Doc object from .json() results */
  nlp.load = function(json) {
    let list = tokenize.fromJSON(json, world)
    return new Doc(list, null, world)
  }

  /** log our decision-making for debugging */
  nlp.verbose = function(bool = true) {
    world.verbose(bool)
    return this
  }

  /** create instance using global world or new world */
  nlp.instance = function() {
    return instance()
  }

  /** current version of the library */
  nlp.version = version
  // alias
  nlp.import = nlp.load

  return nlp
}

module.exports = instance()
