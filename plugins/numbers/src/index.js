const toNumber = require('./toNumber')
const toText = require('./toText')
const findNumbers = require('./find')
const numOrdinal = require('./toOrdinal/numOrdinal')
const textOrdinal = require('./toOrdinal/textOrdinal')

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
        let num = toNumber(val.normal())
        if (val.has('#Ordinal')) {
          let str = numOrdinal(num)
          this.replaceWith(str)
        } else {
          this.replaceWith(num)
        }
      })
      return this
    }
    toText() {
      this.forEach(val => {
        let num = toNumber(val.normal())
        if (val.has('#Ordinal')) {
          let str = textOrdinal(num)
          this.replaceWith(str)
        } else {
          let str = toText(num)
          this.replaceWith(str)
        }
      })
      return this
    }
    toCardinal() {
      let m = this.if('#Ordinal')
      m.forEach(val => {
        let num = toNumber(val.normal())
        if (val.has('#TextNumber')) {
          let str = toText(num)
          this.replaceWith(str)
        } else {
          this.replaceWith(num)
        }
      })
      return this
    }
    toOrdinal() {
      let m = this.if('#Cardinal')
      m.forEach(val => {
        let num = toNumber(val.normal())
        if (val.has('#TextNumber')) {
          let str = textOrdinal(num)
          this.replaceWith(str)
        } else {
          let str = numOrdinal(num)
          this.replaceWith(str)
        }
      })
      return this
    }
    // greaterThan() {}
    // lessThan() {}
    // between() {}
    // add() {}
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
