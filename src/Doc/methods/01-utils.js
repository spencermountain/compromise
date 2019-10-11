// const cache = require('./_setCache')

/** return the root, first document */
exports.all = function() {
  return this.parents()[0] || this
}

/** return the previous result */
exports.parent = function() {
  if (this.from) {
    return this.from
  }
  return this
}

/**  return a list of all previous results */
exports.parents = function(n) {
  let arr = []
  const addParent = function(doc) {
    if (doc.from) {
      arr.push(doc.from)
      addParent(doc.from)
    }
  }
  addParent(this)
  arr = arr.reverse()
  if (typeof n === 'number') {
    return arr[n]
  }
  return arr
}

/** deep-copy the document, so that no references remain */
exports.clone = function() {
  let list = this.list.map(ts => ts.deepClone())
  let tmp = this.buildFrom(list)
  return tmp
}

/** how many seperate terms does the document have? */
exports.wordCount = function() {
  return this.list.reduce((count, p) => {
    count += p.wordCount()
    return count
  }, 0)
}
exports.wordcount = exports.wordCount

/** turn on logging for decision-debugging */
exports.verbose = function(bool) {
  if (bool === undefined) {
    bool = true
  }
  this.world.verbose = bool
}

/** todo: */
exports.pre = function(str) {
  let p = this.list[0]
  let terms = p.terms(0)
  if (str === undefined) {
    return terms[0].pre
  }
  terms[0].pre = str
  return this
}

/** todo: */
exports.post = function(str) {
  // return array of post strings
  if (str === undefined) {
    return this.list.map(p => {
      let terms = p.terms()
      let term = terms[terms.length - 1]
      return term.post
    })
  }
  // set post string on all ends
  this.list.forEach(p => {
    let terms = p.terms()
    let term = terms[terms.length - 1]
    term.post = str
  })
  return this
}

/** freeze the current state of the document, for speed-purposes*/
exports.cache = function() {
  this.list.forEach(p => {
    let words = {}
    p.cache.terms = p.terms()
    // cache all the terms
    p.cache.terms.forEach(t => {
      words[t.clean] = true
      if (t.implicit) {
        words[t.implicit] = true
      }
      if (t.alias) {
        words = Object.assign(words, t.alias)
      }
    })
    p.cache.words = words
  })
  return this
}

/** un-freezes the current state of the document, so it may be transformed */
exports.uncache = function() {
  this.list.forEach(p => {
    p.cache = {}
  })
}
