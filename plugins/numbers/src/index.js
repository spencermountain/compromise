const toNumber = require('./toNumber')
const toText = require('./toText')
const findNumbers = require('./find')
const numOrdinal = require('./toOrdinal/numOrdinal')
const textOrdinal = require('./toOrdinal/textOrdinal')

//business-logic for converting a cardinal-number to other forms
const makeNumber = function(num, isText, isOrdinal) {
  if (isText) {
    if (isOrdinal) {
      return textOrdinal(num)
    }
    return toText(num)
  }
  //make a number
  if (isOrdinal) {
    return numOrdinal(num)
  }
  return String(num)
}

// get a numeric value from this phrase
const getNumber = function(p) {
  let str = p.normal()
  str = str.replace(/[a-z]+$/, '') //remove units like '5kg'
  return toNumber(str)
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
        let num = getNumber(val)
        let str = makeNumber(num, false, val.has('#Ordinal'))
        this.replaceWith(str)
      })
      return this
    }
    toText() {
      this.forEach(val => {
        let num = getNumber(val)
        let str = makeNumber(num, true, val.has('#Ordinal'))
        this.replaceWith(str)
      })
      return this
    }
    toCardinal() {
      let m = this.if('#Ordinal')
      m.forEach(val => {
        let num = getNumber(val)
        let str = makeNumber(num, val.has('#TextNumber'), false)
        this.replaceWith(str)
      })
      return this
    }
    toOrdinal() {
      let m = this.if('#Cardinal')
      m.forEach(val => {
        let num = getNumber(val)
        let str = makeNumber(num, val.has('#TextNumber'), true)
        this.replaceWith(str)
      })
      return this
    }
    // greaterThan() {}
    // lessThan() {}
    // between() {}
    add(n) {
      if (!n) {
        return this
      }
      this.forEach(val => {
        let num = getNumber(val)
        num += n
        let str = makeNumber(num, val.has('#TextNumber'), val.has('#Ordinal'))
        this.replaceWith(str)
      })
      return this
    }
    // subtract() {}
    // increment() {}
    // decrement() {}
  }

  Doc.prototype.numbers = function(n) {
    let match = findNumbers(this, n)
    return new Numbers(match.list, this, this.world)
  }
  // alias
  Doc.prototype.values = Doc.prototype.numbers
  return Doc
}
module.exports = addMethod
