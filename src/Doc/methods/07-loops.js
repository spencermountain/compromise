/* run each phrase through a function, and create a new document */
exports.map = function(fn) {
  if (!fn) {
    return this
  }
  let list = this.list.map((p, i) => {
    let doc = this.buildFrom([p])
    doc.from = null //it's not a child/parent
    let res = fn(doc, i)
    if (res.list && res.list[0]) {
      return res.list[0]
    }
    return res
  })
  return this.buildFrom(list)
}

/** run a function on each phrase */
exports.forEach = function(fn) {
  if (!fn) {
    return this
  }
  this.list.forEach((p, i) => {
    let doc = this.buildFrom([p])
    doc.from = null //it's not a child/parent
    fn(doc, i)
  })
  return this
}

/** return only the phrases that return true */
exports.filter = function(fn) {
  if (!fn) {
    return this
  }
  let list = this.list.filter((p, i) => {
    let doc = this.buildFrom([p])
    doc.from = null //it's not a child/parent
    return fn(doc, i)
  })
  return this.buildFrom(list)
}

/** return a document with only the first phrase that matches */
exports.find = function(fn) {
  if (!fn) {
    return this
  }
  let list = this.list.find((p, i) => {
    let doc = this.buildFrom([p])
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
  if (!fn) {
    return this
  }
  return this.list.some((p, i) => {
    let doc = this.buildFrom([p])
    doc.from = null //it's not a child/parent
    return fn(doc, i)
  })
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

/** combine each phrase into a new data-structure */
// exports.reduce = function(fn, h) {
//   let list = this.list.reduce((_h, ts) => {
//     let doc = this.buildFrom([ts])
//     doc.from = null //it's not a child/parent
//     return fn(_h, doc)
//   }, h)
//   return this.buildFrom(list)
// }
