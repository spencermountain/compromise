const tokenize = require('./01-tokenizer')
const version = require('./_version')
const World = require('./World/World')
const Doc = require('./Doc/Doc')

function instance(worldInstance) {
  //blast-out our word-lists, just once
  let world = worldInstance

  /** parse and tag text into a compromise object  */
  const nlp = function(text = '', lexicon) {
    if (lexicon) {
      world.addWords(lexicon)
    }
    let list = tokenize(text, world)
    let doc = new Doc(list, null, world)
    doc.tagger()
    return doc
  }

  /** parse text into a compromise object, without running POS-tagging */
  nlp.tokenize = function(text = '', lexicon) {
    if (lexicon) {
      world.addWords(lexicon)
    }
    let list = tokenize(text, world)
    let doc = new Doc(list, null, world)
    return doc
  }

  /** mix in a compromise-plugin */
  nlp.extend = function(fn) {
    fn(Doc, world, this)
    return this
  }

  /** make a deep-copy of the library state */
  nlp.clone = function() {
    return instance(world.clone())
  }

  /** log our decision-making for debugging */
  nlp.verbose = function(bool = true) {
    world.verbose(bool)
    return this
  }

  /** current version of the library */
  nlp.version = version
  // alias
  nlp.import = nlp.load

  return nlp
}

module.exports = instance(new World())
