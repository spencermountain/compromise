const parseNumber = require('./parse')
const makeNumber = require('./makeNumber')

let methods = {
  /** overload the original json with noun information */
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

  isOrdinal: function() {
    return this.if('#Ordinal')
  },
  isCardinal: function() {
    return this.if('#Cardinal')
  },
  toNumber: function() {
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, false, val.has('#Ordinal'))
      val.replaceWith(str)
    })
    return this
  },
  // toNumber, but with some commas
  toLocaleString: function() {
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      obj.num = obj.num.toLocaleString()
      let str = makeNumber(obj, false, val.has('#Ordinal'))
      val.replaceWith(str)
    })
    return this
  },
  toText: function() {
    this.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, true, val.has('#Ordinal'))
      val.replaceWith(str)
    })
    return this
  },
  toCardinal: function() {
    let m = this.if('#Ordinal')
    m.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), false)
      val.replaceWith(str)
    })
    return this
  },

  toOrdinal: function() {
    let m = this.if('#Cardinal')
    m.forEach(val => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), true)
      val.replaceWith(str)
    })
    return this
  },
  isEqual: function(n) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num === n
    })
  },
  greaterThan: function(n) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num > n
    })
  },
  lessThan: function(n) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num < n
    })
  },
  between: function(a, b) {
    return this.filter(val => {
      let num = parseNumber(val).num
      return num > a && num < b
    })
  },
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
      val.replaceWith(str)
    })
    return this
  },
  subtract: function(n) {
    return this.add(n * -1)
  },
  increment: function() {
    this.add(1)
    return this
  },
  decrement: function() {
    this.add(-1)
    return this
  },
}
// aliases
methods.toNice = methods.toLocaleString
methods.minus = methods.subtract
methods.plus = methods.add
methods.equals = methods.isEqual

module.exports = methods
