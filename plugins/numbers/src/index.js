const findNumbers = require('./find')
const methods = require('./methods')
const tagger = require('./tagger')
const tags = require('./tags')

/** adds .numbers() method */
const addMethod = function(Doc, world) {
  // add tags to our tagset
  world.addTags(tags)

  // additional tagging before running the number-parser
  world.postProcess(tagger)

  /** a list of number values, and their units */
  class Numbers extends Doc {}
  //aliases
  Object.assign(Numbers.prototype, methods)

  Doc.prototype.numbers = function(n) {
    let match = findNumbers(this, n)
    return new Numbers(match.list, this, this.world)
  }

  /** return things like 1/3rd */
  Doc.prototype.fractions = function(n) {
    let m = this.match('#Fraction')
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return m
  }

  /** return things like CCXX*/
  Doc.prototype.romanNumerals = function(n) {
    let m = this.match('#RomanNumeral').numbers()
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return m
  }

  /** return things like $4.50*/
  Doc.prototype.money = function(n) {
    let m = this.match('#Money').numbers()
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return m
  }

  // alias for reverse-compatibility
  Doc.prototype.values = Doc.prototype.numbers
  return Doc
}
module.exports = addMethod
