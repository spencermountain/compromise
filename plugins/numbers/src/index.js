const toNumber = require('./toNumber')
const toText = require('./toText')
const findNumbers = require('./find')
const numOrdinal = require('./toOrdinal/numOrdinal')
const textOrdinal = require('./toOrdinal/textOrdinal')

//business-logic for converting a cardinal-number to other forms
const makeNumber = function(obj, isText, isOrdinal) {
  let num = obj.num
  if (isText) {
    if (isOrdinal) {
      //ordinal-text
      num = textOrdinal(obj.num)
    } else {
      //cardinal-text
      num = toText(obj.num)
    }
  } else if (isOrdinal) {
    //ordinal-number
    return numOrdinal(obj.num)
  } else {
    //cardinal-number
    num = String(obj.num)
  }
  return `${obj.prefix || ''}${num}${obj.suffix || ''}`
}

// get a numeric value from this phrase
const parseNumber = function(p) {
  let str = p.normal()
  let arr = str.split(/^([^0-9]*)([0-9]*)([^0-9]*)$/)
  return {
    prefix: arr[1] || '',
    num: toNumber(arr[2] || ''),
    suffix: arr[3] || '',
  }
}

/** adds .numbers() method */
const addMethod = function(Doc) {
  /** a list of number values, and their units */
  class Numbers extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.unit = this.match('#Unit+$')
      let numbers = this.not('#Unit+$')
      this.list = numbers.list
    }
    isOrdinal() {
      return this.if('#Ordinal')
    }
    isCardinal() {
      return this.if('#Cardinal')
    }
    toNumber() {
      this.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, false, val.has('#Ordinal'))
        this.replaceWith(str)
      })
      return this
    }
    toText() {
      this.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, true, val.has('#Ordinal'))
        this.replaceWith(str)
      })
      return this
    }
    toCardinal() {
      let m = this.if('#Ordinal')
      m.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, val.has('#TextNumber'), false)
        this.replaceWith(str)
      })
      return this
    }
    toOrdinal() {
      let m = this.if('#Cardinal')
      m.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, val.has('#TextNumber'), true)
        this.replaceWith(str)
      })
      return this
    }
    greaterThan(n) {
      return this.filter(val => {
        let num = parseNumber(val).num
        return num > n
      })
    }
    // lessThan() {}
    // between() {}
    add(n) {
      if (!n) {
        return this // don't bother
      }
      return this.map(val => {
        let obj = parseNumber(val)
        obj.num += n
        let str = makeNumber(obj, val.has('#TextNumber'), val.has('#Ordinal'))
        // console.log(val, str)
        return val.replaceWith(str)
      })
    }
    subtract(n) {
      if (!n) {
        return this // don't bother
      }
      this.forEach(val => {
        let obj = parseNumber(val)
        obj.num -= n
        let str = makeNumber(obj, val.has('#TextNumber'), val.has('#Ordinal'))
        this.replaceWith(str)
      })
      return this
    }
    increment() {
      this.add(1)
    }
    decrement() {
      this.subtract(1)
    }
  }
  //aliases
  Numbers.prototype.plus = Numbers.prototype.add
  Numbers.prototype.minus = Numbers.prototype.subtract

  Doc.prototype.numbers = function(n) {
    let match = findNumbers(this, n)
    return new Numbers(match.list, this, this.world)
  }
  // alias for reverse-compatibility
  Doc.prototype.values = Doc.prototype.numbers
  return Doc
}
module.exports = addMethod
