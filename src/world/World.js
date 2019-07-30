const lexData = require('./_data')
const defaultTags = require('./tags')
const unpack = require('efrt-unpack')
const addWords = require('./addWords')

let misc = require('./misc')

//these behaviours are configurable & shared across some plugins
const transforms = {
  verbs: require('../transforms/verbs'),
  adjectives: require('../transforms/adjectives'),
  nouns: require('../transforms/nouns'),
}

let isVerbose = false

/** all configurable linguistic data */
class World {
  constructor() {
    this.lexicon = misc
    this.plurals = {}
    this.conjugations = {}
    this.hasCompound = {}
    this.compounds = {}
    this.transforms = transforms
    this.tags = Object.assign({}, defaultTags)
    this.unpackWords(lexData)
    this.cache = {}
  }
  /** more logs for debugging */
  verbose(bool) {
    isVerbose = bool
    return this
  }
  isVerbose() {
    return isVerbose
  }
  /** augment our lingustic data with new data */
  unpackWords(lex) {
    let tags = Object.keys(lex)
    for (let i = 0; i < tags.length; i++) {
      let words = Object.keys(unpack(lex[tags[i]]))
      addWords(words, tags[i], this)
    }
  }
  /** helper method for logging + debugging */
  stats() {
    return {
      words: Object.keys(this.lexicon).length,
      plurals: Object.keys(this.plurals).length,
      conjugations: Object.keys(this.conjugations).length,
      compounds: Object.keys(this.compounds).length,
    }
  }
}

//  ¯\_(:/)_/¯
const clone = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/** produce a deep-copy of all lingustic data */
World.prototype.clone = function() {
  let w2 = new World()
  //who really knows about this one:
  w2.lexicon = clone(this.lexicon)
  w2.plurals = clone(this.plurals)
  w2.conjugations = clone(this.conjugations)
  w2.tags = clone(this.tags)
  return w2
}
module.exports = World
