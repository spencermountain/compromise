const findNumbers = require('./find')
const methods = require('./methods')
const tagger = require('./tagger')

/** adds .numbers() method */
const addMethod = function(Doc, world) {
  // add tags to our tagset
  world.addTags({
    Fraction: {
      isA: 'Value',
    },
    Multiple: {
      isA: 'Value',
    },
  })

  // additional tagging before running the number-parser
  world.postProcess(tagger)

  /** a list of number values, and their units */
  class Numbers extends Doc {
    constructor(list, from, w) {
      super(list, from, w)
      this.unit = this.match('#Unit+$')
      let numbers = this.not('#Unit+$')
      this.list = numbers.list
    }
  }
  //aliases
  Object.assign(Numbers.prototype, methods)

  Doc.prototype.numbers = function(n) {
    let match = findNumbers(this, n)
    return new Numbers(match.list, this, this.world)
  }

  /** return things like 1/3rd */
  Doc.prototype.fractions = function(n) {
    return this.match('#Fraction')
  }
  /** return things like CCXX*/
  Doc.prototype.romanNumerals = function(n) {
    return this.match('#RomanNumeral')
  }

  // alias for reverse-compatibility
  Doc.prototype.values = Doc.prototype.numbers
  return Doc
}
module.exports = addMethod
