/**  */
exports.wordCount = function() {
  return this.terms().length //TODO: remove implicit terms
}

/** create a Doc from the first Term of each phrase */
exports.term = function(n) {
  let list = this.list.map(p => {
    let term = p.terms(n)
    return p.buildFrom(term.id, 1, this.pool())
  })
  return this.buildFrom(list)
}

/**  */
exports.firstTerm = function() {
  return this.match('^.')
}
/**  */
exports.lastTerm = function() {
  return this.match('.$')
}
/** use only the first result(s) */
exports.first = function(n) {
  if (n === undefined) {
    return this.get(n)
  }
  return this.slice(0, n)
}
/** use only the last result(s) */
exports.last = function(n) {
  if (n === undefined) {
    return this.get(this.list.length - 1)
  }
  let end = this.list.length
  return this.slice(end - n, end)
}

/** grab a subset of the results*/
exports.slice = function(start, end) {
  let list = this.list.slice(start, end)
  return this.buildFrom(list)
}
/** use only the nth result*/
exports.get = function(n) {
  //return an empty result
  if ((!n && n !== 0) || !this.list[n]) {
    return this.buildFrom([])
  }
  let list = [this.list[n]]
  return this.buildFrom(list)
}

/** sample a subset of the results */
exports.random = function(n) {
  if (!this.found) {
    return this
  }
  let r = Math.floor(Math.random() * this.list.length)
  if (n === undefined) {
    let list = [this.list[r]]
    return this.buildFrom(list)
  }
  //prevent it from going over the end
  if (r + n > this.length) {
    r = this.length - n
    r = r < 0 ? 0 : r
  }
  return this.slice(r, r + n)
}

/** return a flat array of term objects */
exports.termList = function() {
  let arr = []
  //'reduce' but faster
  for (let i = 0; i < this.list.length; i++) {
    let terms = this.list[i].terms()
    for (let o = 0; o < terms.length; o++) {
      arr.push(terms[o])
    }
  }
  return arr
}

/** how many seperate terms does the document have? */
exports.wordCount = function() {
  return this.list.reduce((count, p) => {
    count += p.wordCount
    return count
  }, 0)
}
exports.wordcount = exports.wordCount
