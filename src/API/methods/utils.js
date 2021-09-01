const utils = {
  /** */
  termList: function () {
    return this.methods.one.termList(this.docs)
  },
  /** */
  terms: function (n) {
    let m = this.match('.') //make this faster
    return typeof n === 'number' ? m.eq(n) : m
  },
  /** */
  cache: function () {
    this._cache = this.methods.one.cacheDoc(this.document)
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
  slice: function (min, max) {
    let pntrs = this.pointer || this.docs.map((_o, n) => [n])
    pntrs = pntrs.slice(min, max)
    return this.update(pntrs)
  },

  /** */
  all: function () {
    return this.update()
  },

  /** */
  is: function (b) {
    if (!b || !b.isView) {
      return false
    }
    let aPtr = this.fullPointer
    let bPtr = b.fullPointer
    if (!aPtr.length === bPtr.length) {
      return false
    }
    // ensure pointers are the same
    return aPtr.every((ptr, i) => {
      return ptr[0] === bPtr[i][0] && ptr[1] === bPtr[i][1] && ptr[2] === bPtr[i][2]
    })
  },

  /** */
  toLowerCase: function () {
    this.termList().forEach(t => {
      t.text = t.text.toLowerCase()
    })
    return this
  },
  /** */
  toUpperCase: function () {
    this.termList().forEach(t => {
      t.text = t.text.toUpperCase()
    })
    return this
  },
  /** */
  toTitleCase: function () {
    this.termList().forEach(t => {
      t.text = t.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //support unicode?
    })
    return this
  },
  /** */
  toCamelCase: function () {
    this.docs.forEach(terms => {
      terms.forEach((t, i) => {
        if (i !== 0) {
          t.text = t.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //support unicode?
        }
        if (i !== terms.length - 1) {
          t.post = ''
        }
      })
    })
    return this
  },
  /** how many seperate terms does the document have? */
  wordCount: function () {
    return this.docs.reduce((count, terms) => {
      count += terms.filter(t => t.text !== '').length
      return count
    }, 0)
  },
}
utils.group = utils.groups
export default utils
