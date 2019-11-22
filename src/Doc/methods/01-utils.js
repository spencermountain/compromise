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
exports.clone = function(doShallow) {
  let list = this.list.map(ts => ts.clone(doShallow))
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
// exports.verbose = function(bool) {
//   if (bool === undefined) {
//     bool = true
//   }
//   this.world.verbose = bool
// }

/** freeze the current state of the document, for speed-purposes*/
exports.cache = function(options) {
  options = options || {}
  this.list.forEach(p => {
    let words = {}
    p.cache = p.cache || {}
    p.cache.terms = p.cache.terms || p.terms()
    // cache all the terms
    p.cache.terms.forEach(t => {
      words[t.clean] = true
      words[t.reduced] = true
      words[t.text.toLowerCase()] = true
      if (t.implicit) {
        words[t.implicit] = true
      }
      if (t.root) {
        words[t.root] = true
      }
      if (t.alias !== undefined) {
        words = Object.assign(words, t.alias)
      }
      if (options.root) {
        t.setRoot(this.world)
        words[t.root] = true
      }
    })
    delete words['']
    p.cache.words = words
  })
  return this
}

/** un-freezes the current state of the document, so it may be transformed */
exports.uncache = function() {
  this.list.forEach(p => {
    p.cache = {}
  })
  // do parents too?
  this.parents().forEach(doc => {
    doc.list.forEach(p => {
      p.cache = {}
    })
  })
  return this
}
