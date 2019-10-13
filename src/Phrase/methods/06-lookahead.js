exports.lookBehind = function(regs) {
  let pool = this.pool
  // get a list of all terms preceding our start
  let terms = []
  const getBefore = function(id) {
    let term = pool.get(id)
    terms.push(term)
    if (term.prev) {
      getBefore(term.prev) //recursion
    }
  }
  let term = pool.get(this.start)
  getBefore(term.prev)
  // got the terms, make a phrase from them
  let p = this.buildFrom(terms[terms.length - 1].id, terms.length)
  return p.match(regs)
}
