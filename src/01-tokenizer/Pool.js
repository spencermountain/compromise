/** a key-value store of all terms in our Document */
class Pool {
  constructor(words = {}) {
    //quiet this property in console.logs
    Object.defineProperty(this, 'words', {
      enumerable: false,
      value: words,
    })
  }
  /** throw a new term object in */
  add(term) {
    this.words[term.id] = term
    return this
  }
  /** find a term by it's id */
  get(id) {
    return this.words[id]
  }
  /** find a term by it's id */
  remove(id) {
    delete this.words[id]
  }
  merge(pool) {
    Object.assign(this.words, pool.words)
    return this
  }
  /** helper method */
  stats() {
    return {
      words: Object.keys(this.words).length,
    }
  }
}

/** make a deep-copy of all terms */
Pool.prototype.clone = function () {
  let keys = Object.keys(this.words)
  let words = keys.reduce((h, k) => {
    let t = this.words[k].clone()
    h[t.id] = t
    return h
  }, {})
  return new Pool(words)
}

module.exports = Pool
