const defaultData = require('./_data')
const defaultTags = require('./tags')
const efrt = require('efrt-unpack')
const addWords = require('./01-addWords')
const addConjugations = require('./02-conjugations')
const addPlurals = require('./03-plurals')
const addTags = require('./04-addTags')
let lex = require('./misc')

//these behaviours are configurable & shared across some plugins
const transforms = {
  verbs: require('./transforms/verbs'),
  adjectives: require('./transforms/adjectives'),
  nouns: require('./transforms/nouns'),
}

let isVerbose = false

/** all configurable linguistic data */
class World {
  constructor() {
    this.lexicon = lex
    this.plurals = {}
    this.conjugations = {}
    this.hasCompound = {}
    this.compounds = {}
    this.transforms = transforms
    this.tags = Object.assign({}, defaultTags)
    this.plugin(defaultData)
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
  plugin(x) {
    let obj = x
    if (typeof x === 'string') {
      obj = JSON.parse(x)
    }
    if (obj.words) {
      let words = efrt(obj.words)
      addWords(this, words)
    }
    if (obj.plurals) {
      let plurals = addPlurals(obj.plurals, this.lexicon)
      this.plurals = Object.assign(this.plurals, plurals)
    }
    if (obj.conjugations) {
      let conjugations = addConjugations(obj.conjugations, this.lexicon)
      this.conjugations = Object.assign(this.conjugations, conjugations) //merge this one properly
    }
    if (obj.tags) {
      let tags = addTags(obj.tags)
      this.tags = Object.assign(this.tags, tags)
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
