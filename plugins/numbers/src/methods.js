const parseNumber = require('./parse')
const makeNumber = require('./convert/makeNumber')

let methods = {
  /** overloaded json method with additional number information */
  json: function(options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { text: true, normal: true, trim: true, terms: true }
    let res = []
    this.forEach(doc => {
      let json = doc.json(options)[0]
      let obj = parseNumber(doc)
      json.prefix = obj.prefix
      json.number = obj.num
      json.suffix = obj.suffix
      json.cardinal = makeNumber(obj, false, false)
      json.ordinal = makeNumber(obj, false, true)
      json.textCardinal = makeNumber(obj, true, false)
      json.textOrdinal = makeNumber(obj, true, true)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },
  /** return only ordinal numbers */
  isOrdinal: function() {
    return this.if('#Ordinal')
  },
  /** return only cardinal numbers*/
  isCardinal: function() {
    return this.if('#Cardinal')
  },
  /** convert to numeric form like '8' or '8th' */
  toNumber: function() {
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, false, val.has('#Ordinal'))
      val.replaceWith(str, true)
      val.tag('NumericValue')
    })
    return this
  },
  /** add commas, or nicer formatting for numbers */
  toLocaleString: function() {
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      obj.num = obj.num.toLocaleString()
      let str = makeNumber(obj, false, val.has('#Ordinal'))
      val.replaceWith(str, true)
    })
    return this
  },
  /** convert to text form - like 'eight' or 'eigth'*/
  toText: function() {
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, true, val.has('#Ordinal'))
      val.replaceWith(str, true)
      val.tag('TextValue')
    })
    return this
  },
  /** convert to cardinal form, like 'eight', or '8' */
  toCardinal: function() {
    let m = this.if('#Ordinal')
    m.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), false)
      val.replaceWith(str, true)
      val.tag('Cardinal')
    })
    return this
  },
  /** convert to ordinal form, like 'eighth', or '8th' */
  toOrdinal: function() {
    let m = this.if('#Cardinal')
    m.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), true)
      val.replaceWith(str, true)
      val.tag('Ordinal')
    })
    return this
  },
  /** return only numbers that are == n */
  isEqual: function(n) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num === n
    })
  },
  /** return only numbers that are > n*/
  greaterThan: function(n) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num > n
    })
  },
  /** return only numbers that are < n*/
  lessThan: function(n) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num < n
    })
  },
  /** return only numbers > min and < max */
  between: function(min, max) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num > min && num < max
    })
  },
  /** increase each number by n */
  add: function(n) {
    if (!n) {
      return this // don't bother
    }
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      obj.num += n
      let str = makeNumber(obj, val.has('#TextValue'), val.has('#Ordinal'))
      val.replaceWith(str, true)
    })
    return this
  },
  /** decrease each number by n*/
  subtract: function(n) {
    return this.add(n * -1)
  },
  /** increase each number by 1 */
  increment: function() {
    this.add(1)
    return this
  },
  /** decrease each number by 1 */
  decrement: function() {
    this.add(-1)
    return this
  },
}
// aliases
methods.toNice = methods.toLocaleString
methods.isBetween = methods.between
methods.minus = methods.subtract
methods.plus = methods.add
methods.equals = methods.isEqual

module.exports = methods
