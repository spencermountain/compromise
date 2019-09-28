/** return a flat array of Term objects */
exports.terms = function(n) {
  // use our cached version, if we have one...
  // if (this.cache && this.cache.terms) {
  // console.log('skipped-terms')
  // if (n !== undefined) {
  // return this.cache.terms[n]
  // }
  // return this.cache.terms
  // }
  let terms = [this.pool.get(this.start)]
  if (this.length === 0) {
    return []
  }
  for (let i = 0; i < this.length - 1; i += 1) {
    let id = terms[terms.length - 1].next
    if (id === null) {
      console.warn('linked-list broken')
      break
    }
    let term = this.pool.get(id)
    terms.push(term)
    //return this one?
    if (n !== undefined && n === i) {
      return terms[n]
    }
  }
  // cache it, for next time?
  // if (!this.cache.words) {
  //   this.cache.words = terms.reduce((h, t) => {
  //     h[t.clean] = true
  //     return h
  //   }, {})
  // }
  // if (!this.cache.terms) {
  //   this.cache.terms = terms
  // }
  if (n !== undefined) {
    return terms[n]
  }
  return terms
}

/** return a deep-copy of this phrse  */
exports.clone = function() {
  //how do we clone part of the pool?
  let terms = this.terms()
  let newTerms = terms.map(t => t.clone())
  //connect these new ids up
  newTerms.forEach((t, i) => {
    //add it to the pool..
    this.pool.add(t)
    if (newTerms[i + 1]) {
      t.next = newTerms[i + 1].id
    }
    if (newTerms[i - 1]) {
      t.prev = newTerms[i - 1].id
    }
  })
  return this.buildFrom(newTerms[0].id, newTerms.length)
}

/** return last term object */
exports.lastTerm = function() {
  let terms = this.terms()
  return terms[terms.length - 1]
}

/** quick lookup for a term id */
exports.hasId = function(wantId) {
  if (this.length === 0 || !wantId) {
    return false
  }
  if (this.start === wantId) {
    return true
  }
  let lastId = this.start
  for (let i = 0; i < this.length - 1; i += 1) {
    let term = this.pool.get(lastId)
    if (term.next === wantId) {
      return true
    }
    lastId = term.next
  }
  return false
}

/** how many seperate, non-empty words is it? */
exports.wordCount = function() {
  return this.terms().filter(t => t.text !== '').length
}
