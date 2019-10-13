exports.lookAhead = function(regs) {
  let pool = this.pool
  // get a list of all terms preceding our start
  let terms = []
  const getAfter = function(id) {
    let term = pool.get(id)
    if (!term) {
      return
    }
    terms.push(term)
    if (term.prev) {
      getAfter(term.next) //recursion
    }
  }
  let term = pool.get(this.start)
  getAfter(term.next)
  if (terms.length === 0) {
    return []
  }
  // got the terms, make a phrase from them
  let p = this.buildFrom(terms[0].id, terms.length)
  return p.match(regs)
}

exports.lookBehind = function(regs) {
  let pool = this.pool
  // get a list of all terms preceding our start
  let terms = []
  const getBefore = function(id) {
    let term = pool.get(id)
    if (!term) {
      return
    }
    terms.push(term)
    if (term.prev) {
      getBefore(term.prev) //recursion
    }
  }
  let term = pool.get(this.start)
  getBefore(term.prev)
  if (terms.length === 0) {
    return []
  }
  // got the terms, make a phrase from them
  let p = this.buildFrom(terms[terms.length - 1].id, terms.length)
  return p.match(regs)
}
