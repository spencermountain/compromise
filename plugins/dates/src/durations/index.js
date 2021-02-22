const parse = require('./parse')

const methods = {
  /** easy getter for the time */
  get: function (options) {
    let arr = []
    this.forEach((doc) => {
      let res = parse(doc)
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
      json.duration = parse(doc)
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
      let list = []
      Object.keys(duration).forEach((unit) => {
        let num = duration[unit]
        let word = unit
        if (num !== 1) {
          word += 's'
        }
        list.push(`${num} ${word}`)
      })
      // splice-in an 'and'
      if (list.length > 1) {
        let beforeEnd = list.length - 1
        list.splice(beforeEnd, 0, 'and')
      }
      let text = list.join(' ')
      doc.replaceWith(text)
    })
    return this
  },
}

const addDurations = function (Doc) {
  /** phrases like '2 months', or '2mins' */
  class Durations extends Doc {
    constructor(list, from, w) {
      super(list, from, w)
      this.context = {}
    }
  }
  //add-in methods
  Object.assign(Durations.prototype, methods)

  /** phrases like '2 months' */
  Doc.prototype.durations = function (n) {
    let m = this.match('#Value+ #Duration and? #Value+? #Duration?')
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Durations(m.list, this, this.world)
  }
}
module.exports = addDurations
