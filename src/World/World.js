const defaultTags = require('./tags')
const unpack = require('./unpack')
const addIrregulars = require('./addIrregulars')
const inferTagSet = require('./tags/inference')

//these let users change inflection / verb conjugation
const irregulars = {
  nouns: require('./data/plurals'),
  verbs: require('./data/conjugations'),
}

//these behaviours are configurable & shared across some plugins
const transforms = {
  conjugate: require('../transforms/conjugate'),
  adjectives: require('../transforms/adjectives'),
  toPlural: require('../transforms/toPlural'),
  toSingular: require('../transforms/toSingular'),
  toInfinitive: require('../transforms/toInfinitive'),
}

let isVerbose = false

/** all configurable linguistic data */
class World {
  constructor() {
    // quiet these properties from a console.log
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: {},
      writable: true,
    })
    Object.defineProperty(this, 'hasCompound', {
      enumerable: false,
      value: {},
      writable: true,
    })
    Object.defineProperty(this, 'irregulars', {
      enumerable: false,
      value: irregulars,
      writable: true,
    })
    Object.defineProperty(this, 'tags', {
      enumerable: false,
      value: Object.assign({}, defaultTags),
      writable: true,
    })
    Object.defineProperty(this, 'transforms', {
      enumerable: false,
      value: transforms,
      writable: true,
    })
    Object.defineProperty(this, 'taggers', {
      enumerable: false,
      value: [],
      writable: true,
    })
    // cache our abbreviations for our sentence-parser
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      value: {
        abbreviations: {},
      },
    })

    // add our compressed data to lexicon
    this.words = unpack.buildOut(this)

    // add our irregulars to lexicon
    addIrregulars(this)
  }

  /** more logs for debugging */
  verbose(bool) {
    isVerbose = bool
    return this
  }
  isVerbose() {
    return isVerbose
  }

  /** put new words into our lexicon, properly */
  addWords(wordObj) {
    // clean them up a bit
    let cleaned = {}
    Object.keys(wordObj).forEach(w => {
      let tag = wordObj[w]
      w = w.toLowerCase().trim()
      cleaned[w] = tag
    })
    unpack.addWords(cleaned, this.words, this)
  }

  /** add new custom conjugations */
  addConjugations(obj) {
    Object.assign(this.irregulars.verbs, obj)
    return this
  }
  /** add new custom plural/singular pairs */
  addPlurals(obj) {
    Object.assign(this.irregulars.nouns, obj)
    return this
  }

  /** extend the compromise tagset */
  addTags(tags) {
    tags = Object.assign({}, tags)
    this.tags = Object.assign(this.tags, tags)
    // calculate graph implications for the new tags
    this.tags = inferTagSet(this.tags)
    return this
  }
  /** call methods after tagger runs */
  postProcess(fn) {
    this.taggers.push(fn)
    return this
  }

  /** helper method for logging + debugging */
  stats() {
    return {
      words: Object.keys(this.words).length,
      plurals: Object.keys(this.irregulars.nouns).length,
      conjugations: Object.keys(this.irregulars.verbs).length,
      compounds: Object.keys(this.hasCompound).length,
      postProcessors: this.taggers.length,
    }
  }
}

//  ¯\_(:/)_/¯
const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/** produce a deep-copy of all lingustic data */
World.prototype.clone = function () {
  let w2 = new World()
  // these are simple to copy:
  w2.words = Object.assign({}, this.words)
  w2.hasCompound = Object.assign({}, this.hasCompound)
  //these ones are nested:
  w2.irregulars = clone(this.irregulars)
  w2.tags = clone(this.tags)
  // these are functions
  w2.transforms = this.transforms
  w2.taggers = this.taggers
  return w2
}
module.exports = World
