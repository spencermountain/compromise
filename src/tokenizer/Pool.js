class Pool {
  constructor(words = {}) {
    this.words = words
  }
  add(term) {
    this.words[term.id] = term
    return this
  }
  get(id) {
    return this.words[id]
  }
  stats() {
    return {
      words: Object.keys(this.words).length,
    }
  }
}
// ¯\_(:/)_/¯
Pool.prototype.clone = function() {
  let keys = Object.keys(this.words)
  let words = keys.reduce((h, k) => {
    let t = this.words[k].clone()
    h[t.id] = t
    return h
  }, {})
  return new Pool(words)
}

module.exports = Pool
