const cacheView = require('./cache')

const methods = {
  /** */
  termList: function () {
    let arr = []
    for (let i = 0; i < this.docs.length; i += 1) {
      for (let t = 0; t < this.docs[i].length; t += 1) {
        arr.push(this.docs[i][t])
      }
    }
    return arr
  },
  /** */
  cache: function () {
    this._cache = cacheView(this)
    return this
  },
  /** */
  uncache: function () {
    this._cache = null
    return this
  },
  /** */
  groups: function (group) {
    if (group) {
      return this.update(this._groups[group] || [])
    }
    // return an object of Views
    let res = {}
    Object.keys(this._groups).forEach(k => {
      res[k] = this.update(this._groups[k])
    })
    // this._groups = null
    return res
  },
  /** */
  eq: function (n) {
    let ptr = this.pointer[n]
    if (ptr) {
      return this.update([ptr])
    }
    return this.update([])
  },
  /** */
  first: function () {
    return this.eq(0)
  },
  /** */
  last: function () {
    let n = this.pointer.length - 1
    return this.eq(n)
  },
  /** */
  parent: function () {
    return this.update()
  },
  /** */
  fork: function () {
    let document = JSON.parse(JSON.stringify(this.document))
    let view = this.update(this.pointer)
    view.document = document
    return
  },
}
module.exports = methods
