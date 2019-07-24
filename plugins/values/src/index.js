const toNumber = require('./toNumber')
const toText = require('./toText')
const findNumbers = require('./find')

const addMethod = function(Doc) {
  /**  */
  class Numbers extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.unit = this.match('#Unit+$')
      let numbers = this.not('#Unit+$')
      this.list = numbers.list
    }
    // noDates() {}
    // noUnits() {}
    // units() {}
    // numbers() {}
    toNumber() {
      this.forEach(val => {
        let num = toNumber(val.normal())
        console.log(num)
        // this.replace(val, num)
      })
      return this
    }
    toText() {
      this.forEach(val => {
        let str = toText(val.normal())
        console.log(str)
      })
      return this
    }
    // toCardinal() {}
    // toOrdinal() {}
    // toNice() {}
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
