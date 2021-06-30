/** make all phrases into one phrase */
exports.join = function (str) {
  // clear the cache
  this.uncache()
  // make one large phrase - 'main'
  let main = this.list[0]
  let before = main.length
  let removed = {}
  for (let i = 1; i < this.list.length; i++) {
    const p = this.list[i]
    removed[p.start] = true
    let term = main.lastTerm()
    // add whitespace between them
    if (str) {
      term.post += str
    }
    //  main -> p
    term.next = p.start
    // main <- p
    p.terms(0).prev = term.id
    main.length += p.length
    main.cache = {}
  }

  // parents are bigger than than their children.
  // when we increase a child, we increase their parent too.
  let increase = main.length - before
  this.parents().forEach(doc => {
    // increase length on each effected phrase
    doc.list.forEach(p => {
      let terms = p.terms()
      for (let i = 0; i < terms.length; i++) {
        if (terms[i].id === main.start) {
          p.length += increase
          break
        }
      }
      p.cache = {}
    })
    // remove redundant phrases now
    doc.list = doc.list.filter(p => removed[p.start] !== true)
  })
  // return one major phrase
  return this.buildFrom([main])
}
