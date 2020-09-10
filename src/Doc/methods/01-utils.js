/** return the root, first document */
exports.all = function () {
  return this.parents()[0] || this
}

/** return the previous result */
exports.parent = function () {
  if (this.from) {
    return this.from
  }
  return this
}

/**  return a list of all previous results */
exports.parents = function (n) {
  let arr = []
  const addParent = function (doc) {
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
exports.clone = function (doShallow) {
  let list = this.list.map(ts => ts.clone(doShallow))
  let tmp = this.buildFrom(list)
  return tmp
}

/** how many seperate terms does the document have? */
exports.wordCount = function () {
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
