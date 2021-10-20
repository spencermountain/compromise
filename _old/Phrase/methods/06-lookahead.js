/** match any terms after this phrase */
exports.lookAhead = function (regs) {
  // if empty match string, return everything after
  if (!regs) {
    regs = '.*'
  }
  let pool = this.pool
  // get a list of all terms preceding our start
  let terms = []
  const getAfter = function (id) {
    let term = pool.get(id)
    if (!term) {
      return
    }
    terms.push(term)
    if (term.prev) {
      getAfter(term.next) //recursion
    }
  }
  let all = this.terms()
  let lastTerm = all[all.length - 1]
  getAfter(lastTerm.next)
  if (terms.length === 0) {
    return []
  }
  // got the terms, make a phrase from them
  let p = this.buildFrom(terms[0].id, terms.length)
  return p.match(regs)
}

/** match any terms before this phrase */
exports.lookBehind = function (regs) {
  // if empty match string, return everything before
  if (!regs) {
    regs = '.*'
  }
  let pool = this.pool
  // get a list of all terms preceding our start
  let terms = []
  const getBefore = function (id) {
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
