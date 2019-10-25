const toText = require('./toText')
const parseNumber = require('./parse')
const numOrdinal = require('./toOrdinal/numOrdinal')
const textOrdinal = require('./toOrdinal/textOrdinal')

//business-logic for converting a cardinal-number to other forms
const makeNumber = function(obj, isText, isOrdinal) {
  let num = String(obj.num)
  if (isText) {
    if (isOrdinal) {
      //ordinal-text
      num = textOrdinal(num)
    } else {
      //cardinal-text
      num = toText(num)
    }
  } else if (isOrdinal) {
    //ordinal-number
    return numOrdinal(num)
  }
  return `${obj.prefix || ''}${num}${obj.suffix || ''}`
}

module.exports = {
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
      let str = makeNumber(obj, val.has('#TextNumber'), false)
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
      let str = makeNumber(obj, val.has('#TextNumber'), true)
      val.replaceWith(str)
    })
    return this
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
      let str = makeNumber(obj, val.has('#TextNumber'), val.has('#Ordinal'))
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
