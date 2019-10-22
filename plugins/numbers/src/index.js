const toNumber = require('./toNumber')
const toText = require('./toText')
const findNumbers = require('./find')
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

// get a numeric value from this phrase
const parseNumber = function(p) {
  let str = p.text('reduced')
  //parse a numeric-number (easy)
  let arr = str.split(/^([^0-9]*)([0-9]*)([^0-9]*)$/)
  if (arr[2]) {
    let num = parseFloat(arr[2] || str)
    //ensure that num is an actual number
    if (typeof num !== 'number') {
      num = null
    }
    let suffix = arr[3] || ''
    if (suffix === 'st' || suffix === 'nd' || suffix === 'rd' || suffix === 'th') {
      suffix = ''
    }
    return {
      prefix: arr[1] || '',
      num: num,
      suffix: suffix,
    }
  }
  //parse a text-numer (harder)
  let num = toNumber(str)
  return {
    prefix: '',
    num: num,
    suffix: '',
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
        val.replaceWith(str)
      })
      return this
    }
    toText() {
      this.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, true, val.has('#Ordinal'))
        val.replaceWith(str)
      })
      return this
    }
    toCardinal() {
      let m = this.if('#Ordinal')
      m.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, val.has('#TextNumber'), false)
        val.replaceWith(str)
      })
      return this
    }
    toOrdinal() {
      let m = this.if('#Cardinal')
      m.forEach(val => {
        let obj = parseNumber(val)
        let str = makeNumber(obj, val.has('#TextNumber'), true)
        val.replaceWith(str)
      })
      return this
    }
    greaterThan(n) {
      return this.filter(val => {
        let num = parseNumber(val).num
        return num > n
      })
    }
    lessThan(n) {
      return this.filter(val => {
        let num = parseNumber(val).num
        return num < n
      })
    }
    between(a, b) {
      return this.filter(val => {
        let num = parseNumber(val).num
        return num > a && num < b
      })
    }
    add(n) {
      if (!n) {
        return this // don't bother
      }
      this.forEach(val => {
        let obj = parseNumber(val)
        obj.num += n
        let str = makeNumber(obj, val.has('#TextNumber'), val.has('#Ordinal'))
        val.replaceWith(str)
      })
      return this
    }
    subtract(n) {
      return this.add(n * -1)
    }
    increment() {
      this.add(1)
    }
    decrement() {
      this.add(-1)
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
