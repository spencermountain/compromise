const methods = require('./methods')
const matchMethods = require('./match')

class Phrase {
  constructor(id, length, pool) {
    this.start = id
    this.length = length
    this.isA = 'Phrase' // easier than .constructor...
    Object.defineProperty(this, 'pool', {
      enumerable: false,
      writable: true,
      value: pool,
    })
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      writable: true,
      value: {},
    })
  }
}

/** create a new Phrase object from an id and length */
Phrase.prototype.buildFrom = function(id, length) {
  let p = new Phrase(id, length, this.pool)
  // p.parent = this
  if (this.cache) {
    p.cache = this.cache
    p.cache.terms = null
  }
  return p
}

//apply methods
Object.assign(Phrase.prototype, matchMethods)
Object.assign(Phrase.prototype, methods)

//apply aliases
const aliases = {
  term: 'terms',
}
Object.keys(aliases).forEach(k => (Phrase.prototype[k] = Phrase.prototype[aliases[k]]))

module.exports = Phrase
