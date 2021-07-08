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
  terms: function () {
    return this.match('.') //make this faster
  },
  /** */
  cache: function () {
    this._cache = this.methods.cacheDoc(this.document)
    return this
  },
  /** */
  uncache: function () {
    this._cache = null
    return this
  },
  /** */
  groups: function (group) {
    if (group || group === 0) {
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
    let ptr = this.pointer
    if (!ptr) {
      ptr = this.docs.map((_doc, i) => [i])
    }
    if (ptr[n]) {
      return this.update([ptr[n]])
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
  all: function () {
    return this.update()
  },
  /** */
  fork: function () {
    let document = JSON.parse(JSON.stringify(this.document))
    let view = this.update(this.pointer)
    view.document = document
    return this
  },
  /** */
  trim: function () {
    let docs = this.docs
    let start = docs[0][0]
    start.pre = ''
    let last = docs[docs.length - 1]
    let end = last[last.length - 1]
    end.post = ''
    return this
  },
}
methods.group = methods.groups
methods.clone = methods.fork
export default methods
