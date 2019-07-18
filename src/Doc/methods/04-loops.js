/* javascript array loop-wrappers */
exports.map = function(fn) {
  return this.list.map((ts, i) => {
    let doc = this.buildFrom([ts])
    return fn(doc, i)
  })
}
exports.forEach = function(fn) {
  this.list.forEach((ts, i) => {
    let doc = this.buildFrom([ts])
    fn(doc, i)
  })
  return this
}
exports.filter = function(fn) {
  let list = this.list.filter((ts, i) => {
    let doc = this.buildFrom([ts])
    return fn(doc, i)
  })
  return new Text(list, this.world)
}
exports.reduce = function(fn, h) {
  return this.list.reduce((_h, ts) => {
    let doc = this.buildFrom([ts])
    return fn(_h, doc)
  }, h)
}
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
