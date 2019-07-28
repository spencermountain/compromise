/* run each phrase through a function, and create a new document */
exports.map = function(fn) {
  let list = this.list.map((ts, i) => {
    let doc = this.buildFrom([ts])
    doc.from = null //it's not a child/parent
    return fn(doc, i).list[0]
  })
  return this.buildFrom(list)
}

/* grab nth result */
exports.eq = function(n) {
  let p = this.list[n]
  if (p === undefined) {
    return this.buildFrom([])
  }
  return this.buildFrom([p])
}

/** run a function on each phrase */
exports.forEach = function(fn) {
  this.list.forEach((ts, i) => {
    let doc = this.buildFrom([ts])
    doc.from = null //it's not a child/parent
    fn(doc, i)
  })
  return this
}

/** return only the phrases that return true */
exports.filter = function(fn) {
  let list = this.list.filter((ts, i) => {
    let doc = this.buildFrom([ts])
    doc.from = null //it's not a child/parent
    return fn(doc, i)
  })
  return this.buildFrom(list)
}

/** combine each phrase into a new data-structure */
// exports.reduce = function(fn, h) {
//   let list = this.list.reduce((_h, ts) => {
//     let doc = this.buildFrom([ts])
//     doc.from = null //it's not a child/parent
//     return fn(_h, doc)
//   }, h)
//   return this.buildFrom(list)
// }

/** return a document with only the first phrase that matches */
exports.find = function(fn) {
  let list = this.list.find((ts, i) => {
    let doc = this.buildFrom([ts])
    doc.from = null //it's not a child/parent
    return fn(doc, i)
  })
  if (list) {
    return this.buildFrom([list])
  }
  return undefined
}

/** return true or false if there is one matching phrase */
exports.some = function(fn) {
  return this.list.some((ts, i) => {
    let doc = this.buildFrom([ts])
    doc.from = null //it's not a child/parent
    return fn(doc, i)
  })
}
