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
exports.parents = function() {
  let arr = []
  const addParent = function(doc) {
    if (doc.from) {
      arr.push(doc.from)
      addParent(doc.from)
    }
  }
  addParent(this)
  return arr.reverse()
}

/** deep-copy the document, so that no references remain */
exports.clone = function() {
  let list = this.list.map(ts => ts.clone())
  let tmp = this.buildFrom(list)
  return tmp
}

/** how many seperate terms does the document have? */
exports.wordCount = function() {
  return this.list.reduce((count, p) => {
    count += p.wordCount
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

/** freeze the current state of the document, for speed-purposes*/
// exports.cache = function(options) {
//   return cache(this, options)
// }
// exports.blow = function() {
//   if (this.found && this.list.length > 0) {
//     console.log('\n\n======!!====\n\n')
//     process.exit()
//   }
//   return this
// }
