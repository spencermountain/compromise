const findNumbers = require('./find')
const methods = require('./methods')
const tagger = require('./tagger')
const tags = require('./tags')

/** adds .numbers() method */
const plugin = function (Doc, world) {
  // add tags to our tagset
  world.addTags(tags)

  // additional tagging before running the number-parser
  world.postProcess(tagger)

  /** a list of number values, and their units */
  class Numbers extends Doc {}
  //aliases
  Object.assign(Numbers.prototype, methods)

  class Money extends Numbers {}
  class Fraction extends Numbers {}

  const docMethods = {
    /** find all numbers and values */
    numbers: function (n) {
      let m = findNumbers(this, n)
      return new Numbers(m.list, this, this.world)
    },
    /** numbers that are percentages*/
    percentages: function (n) {
      let m = findNumbers(this, n)
      m = m.if('/%$/')
      return new Numbers(m.list, this, this.world)
    },
    /** number + currency pair */
    money: function () {
      // let nums = findNumbers(this, n)
      let m = this.match('#Money+ #Currency?')
      // m = m.concat(nums.hasAfter('#Currency')) //'5 dollars'
      return new Money(m.list, this, this.world)
    },
    fractions: function (n) {
      let nums = findNumbers(this, n)
      let m = nums.if('#Fraction') //2/3
      return new Fraction(m.list, this, this.world)
    },
  }
  // aliases
  docMethods.values = docMethods.numbers
  docMethods.percents = docMethods.percentages

  Object.assign(Doc.prototype, docMethods)

  return Doc
}
module.exports = plugin
