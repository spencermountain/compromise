const parse = require('./parse')
const parseNumber = require('../numbers/parse')
const makeNumber = require('../numbers/convert/makeNumber')
const lib = require('./_lib')

const methods = {
  toNumber() {
    this.forEach((val) => {
      let obj = parseNumber(val, val.has('#Fraction'))
      let num = lib.toFraction(obj)
      val.replaceWith(String(num), true)
      val.tag('NumericValue')
      val.unTag('Fraction')
    })
    return this
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
      let found = parse(m) || {}
      let num = lib.toFraction(found)
      let obj = parseNumber(m, m.has('#Fraction'))
      json.numerator = found.numerator
      json.denominator = found.denominator
      json.number = num
      json.cardinal = makeNumber(obj, false, false)
      json.textCardinal = makeNumber(obj, true, false)
      res.push(json)
    })
    if (n !== null) {
      return res[n] || {}
    }
    return res
  },

  /** change 'four out of 10' to 4/10 */
  normalize: function () {
    this.forEach((m) => {
      let found = parse(m)
      if (found && typeof found.numerator === 'number' && typeof found.denominator === 'number') {
        let str = `${found.numerator}/${found.denominator}`
        this.replace(m, str)
      }
    })
    return this
  },

  get: function (n) {
    let arr = []
    this.forEach((doc) => {
      arr.push(parseNumber(doc, true).num)
    })
    if (n !== undefined) {
      return arr[n]
    }
    return arr
  },

  // turn the fraction into 'five tenths'
  toText: function (n) {
    let arr = []
    this.forEach((doc) => {
      let obj = parse(doc) || {}
      // create [one] [fifth]
      let str = lib.toText(obj)
      doc.replaceWith(str, true)
      doc.tag('Fraction')
    })
    if (n !== undefined) {
      return arr[n]
    }
    return arr
  },
}
module.exports = methods
