const methods = require('./methods')
const matchMethods = require('./match')
// const tokenize = require('../01-tokenizer')

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
    Object.defineProperty(this, 'groups', {
      enumerable: false,
      writable: true,
      value: {},
    })
  }
}

/** create a new Phrase object from an id and length */
Phrase.prototype.buildFrom = function (id, length, groups) {
  let p = new Phrase(id, length, this.pool)
  //copy-over or replace capture-groups too
  if (groups && Object.keys(groups).length > 0) {
    p.groups = groups
  } else {
    p.groups = this.groups
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
