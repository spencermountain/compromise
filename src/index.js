const tokenize = require('./01-tokenizer')
const fromJSON = require('./01-tokenizer/fromJSON')
const version = require('./_version')
const World = require('./World/World')
const Doc = require('./Doc/Doc')
const Phrase = require('./Phrase/Phrase')
const Term = require('./Term/Term')
const Pool = require('./01-tokenizer/Pool')
const tinyTagger = require('./02-tagger/tiny')
const parseMatch = require('./Doc/match/syntax')

function instance(worldInstance) {
  //blast-out our word-lists, just once
  let world = worldInstance

  /** parse and tag text into a compromise object  */
  const nlp = function (text = '', lexicon) {
    if (lexicon) {
      world.addWords(lexicon)
    }
    let list = tokenize(text, world)
    let doc = new Doc(list, null, world)
    doc.tagger()
    return doc
  }

  /** parse text into a compromise object, without running POS-tagging */
  nlp.tokenize = function (text = '', lexicon) {
    let w = world
    if (lexicon) {
      w = w.clone()
      w.words = {}
      w.addWords(lexicon)
    }
    let list = tokenize(text, w)
    let doc = new Doc(list, null, w)
    if (lexicon || doc.world.taggers.length > 0) {
      tinyTagger(doc)
    }
    return doc
  }

  /** mix in a compromise-plugin */
  nlp.extend = function (fn) {
    fn(Doc, world, this, Phrase, Term, Pool)
    return this
  }

  /** create a compromise Doc object from .json() results */
  nlp.fromJSON = function (json) {
    let list = fromJSON(json, world)
    return new Doc(list, null, world)
  }

  /** make a deep-copy of the library state */
  nlp.clone = function () {
    return instance(world.clone())
  }

  /** log our decision-making for debugging */
  nlp.verbose = function (bool = true) {
    world.verbose(bool)
    return this
  }
  /** grab currently-used World object */
  nlp.world = function () {
    return world
  }
  /** pre-parse any match statements */
  nlp.parseMatch = function (str) {
    return parseMatch(str)
  }

  /** current version of the library */
  nlp.version = version
  // aliases
  nlp.import = nlp.load
  nlp.plugin = nlp.extend

  return nlp
}

module.exports = instance(new World())
