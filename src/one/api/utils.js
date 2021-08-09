const isArray = input => Object.prototype.toString.call(input) === '[object Array]'

const utils = {
  /** */
  termList: function () {
    return this.methods.one.termList(this.docs)
  },
  /** */
  terms: function () {
    return this.match('.') //make this faster
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
  fork: function () {
    let document = JSON.parse(JSON.stringify(this.document))
    let view = this.update(this.pointer)
    view.document = document
    return this
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
    return this.list.reduce((count, p) => {
      count += p.wordCount()
      return count
    }, 0)
  },
  /** add metadata to term objects */
  compute: function (input) {
    const { docs, methods, model } = this
    let fns = methods.compute || {}
    // do one method
    if (typeof input === 'string' && fns.hasOwnProperty(input)) {
      fns[input](docs, model, methods)
    }
    // allow a list of methods
    else if (isArray(input)) {
      input.forEach(name => fns.hasOwnProperty(name) && fns[name](docs, model, methods))
    }
    // allow a custom compute function
    else if (typeof input === 'function') {
      input(this.docs, model, methods)
    } else {
      console.warn('no compute:', input)
      console.log(input)
      // throw Error('compute')
    }
    return this
  },
}
utils.group = utils.groups
utils.clone = utils.fork
export default utils
