/* run each phrase through a function, and create a new document */
exports.map = function(fn) {
  let list = this.list.map((ts, i) => {
    let doc = this.buildFrom([ts])
    return fn(doc, i).list[0]
  })
  return this.buildFrom(list)
}

/** run a function on each phrase */
exports.forEach = function(fn) {
  this.list.forEach((ts, i) => {
    let doc = this.buildFrom([ts])
    fn(doc, i)
  })
  return this
}

/** return only the phrases that return true */
exports.filter = function(fn) {
  let list = this.list.filter((ts, i) => {
    let doc = this.buildFrom([ts])
    return fn(doc, i)
  })
  return new Text(list, this.world)
}

/** combine each phrase into a new data-structure */
exports.reduce = function(fn, h) {
  return this.list.reduce((_h, ts) => {
    let doc = this.buildFrom([ts])
    return fn(_h, doc)
  }, h)
}

/** return a document with only the first phrase that matches */
exports.find = function(fn) {
  for (let i = 0; i < this.list.length; i++) {
    let ts = this.list[i]
    let doc = this.buildFrom([ts])
    if (fn(doc)) {
      return doc
    }
  }
  return undefined
}
