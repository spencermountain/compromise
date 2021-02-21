const parseNumber = require('../numbers/parse')

const parse = function (m) {
  let num = parseNumber(m).num
  if (typeof num === 'number') {
    return num / 100
  }
  return null
}

module.exports = {
  /** get the money info */
  get: function (n) {
    let arr = []
    this.forEach((doc) => {
      let num = parse(doc)
      if (num !== null) {
        arr.push(num)
      }
    })
    if (n !== undefined) {
      return arr[n] || null
    }
    return arr || null
  },

  /** overloaded json method with additional number information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { text: true, normal: true, trim: true, terms: true }
    let res = []
    this.forEach((m) => {
      let json = m.json(options)[0]
      let dec = parse(m)
      json.number = dec
      if (dec !== null) {
        let full = dec * 100
        json.textNumber = `${full} percent`
        json.cardinal = `${full}%`
      }
      res.push(json)
    })
    if (n !== null) {
      return res[n] || {}
    }
    return res
  },
  // turn 80% to 8/100
  toFraction: function () {
    this.forEach((doc) => {
      let num = parse(doc)
      if (num !== null) {
        num *= 100
        num = Math.round(num * 100) / 100
        let str = `${num}/100`
        this.replace(doc, str)
      }
    })
    return this
  },
}
