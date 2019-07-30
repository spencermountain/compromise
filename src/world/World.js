const lexData = require('./_data')
const defaultTags = require('./tags')
const unpack = require('efrt-unpack')
const addWords = require('./addWords')
const addIrregulars = require('./addIrregulars')

let misc = require('./data/misc')

//these let users change inflection / verb conjugation
const irregulars = {
  nouns: require('./data/plurals'),
  verbs: require('./data/conjugations'),
}

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
    // quiet these properties from a console.log
    Object.defineProperty(this, 'lexicon', {
      enumerable: false,
      value: misc,
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
    })
    // add our compressed data to lexicon
    this.unpackWords(lexData)
    // add our irregulars to lexicon
    this.addIrregulars()

    // cache our abbreviations for our sentence-parser
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      value: {
        abbreviations: this.getByTag('#Abbreviation'),
      },
    })
  }

  /** more logs for debugging */
  verbose(bool) {
    isVerbose = bool
    return this
  }
  isVerbose() {
    return isVerbose
  }

  /** get all terms in our lexicon with this tag */
  getByTag(tag) {
    let lex = this.lexicon
    let res = {}
    let words = Object.keys(lex)
    for (let i = 0; i < words.length; i++) {
      if (typeof lex[words[i]] === 'string') {
        if (lex[words[i]] === tag) {
          res[words[i]] = true
        }
      } else if (lex[words[i]].some(t => t === tag)) {
        res[words[i]] = true
      }
    }
    return res
  }

  /** augment our lingustic data with new data */
  unpackWords(lex) {
    let tags = Object.keys(lex)
    for (let i = 0; i < tags.length; i++) {
      let words = Object.keys(unpack(lex[tags[i]]))
      addWords(words, tags[i], this)
    }
  }
  addIrregulars() {
    addIrregulars(this)
    return this
  }

  /** helper method for logging + debugging */
  stats() {
    return {
      words: Object.keys(this.lexicon).length,
      plurals: Object.keys(this.irregular.plurals).length,
      conjugations: Object.keys(this.irregular.conjugations).length,
      compounds: Object.keys(this.hasCompound).length,
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
