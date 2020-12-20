const parse = require('./parse')
const parseNumber = require('../numbers/parse')
const makeNumber = require('../numbers/convert/makeNumber')

const methods = {
  toNumber() {
    this.forEach((val) => {
      let obj = parseNumber(val, val.has('#Fraction'))
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, false)
      val.replaceWith(str, true)
      val.tag('NumericValue')
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
      let obj = parseNumber(m)
      json.numerator = found.numerator
      json.denominator = found.denominator
      json.number = obj.num
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
}
module.exports = methods
