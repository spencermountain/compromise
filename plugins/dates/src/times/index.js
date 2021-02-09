const parse = require('./parse')

const methods = {
  /** easy getter for the time */
  get: function (options) {
    let arr = []
    this.forEach((doc) => {
      let res = parse(doc, this.context)
      arr.push(res)
    })
    if (typeof options === 'number') {
      return arr[options]
    }
    return arr
  },
  /** overload the original json with duration information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { terms: false }
    let res = []
    this.forEach((doc) => {
      let json = doc.json(options)
      json.time = parse(doc)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },
  /** change to a standard duration format */
  normalize: function () {
    this.forEach((doc) => {
      let duration = parse(doc)
      // doc.replaceWith(text)
    })
    return this
  },
}

const addTimes = function (Doc) {
  /** phrases like '2 months', or '2mins' */
  class Times extends Doc {
    constructor(list, from, w) {
      super(list, from, w)
      this.context = {}
    }
  }
  //add-in methods
  Object.assign(Times.prototype, methods)

  /** phrases like '4pm' */
  Doc.prototype.times = function (n) {
    let m = this.match('#Time+')
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Times(m.list, this, this.world)
  }
}
module.exports = addTimes
