const cacheView = require('./cache')

const methods = {
  /** */
  termList: function () {
    let arr = []
    this.docs.forEach(terms => arr.concat(terms))
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
  fork: function () {
    this.document = JSON.parse(JSON.stringify(this.document))
    return this
  },
}
module.exports = methods
