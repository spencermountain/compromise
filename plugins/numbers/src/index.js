const findMoney = require('./money/find')
const findNumbers = require('./numbers/find')
const findFractions = require('./fractions/find')
const findPercentages = require('./percentage/find')

const numberMethods = require('./numbers/methods')
const percentageMethods = require('./percentage/methods')
const moneyMethods = require('./money/methods')
const fractionMethods = require('./fractions/methods')

const tagger = require('./tagger')
const tags = require('./tags')
const lexicon = require('./money/data/lexicon')

/** adds .numbers() method */
const plugin = function (Doc, world) {
  // add money words to our lexicon
  world.addWords(lexicon)
  // add tags to our tagset
  world.addTags(tags)
  // additional tagging before running the number-parser
  world.postProcess(tagger)

  /** a list of number values, and their units */
  class Numbers extends Doc {}
  Object.assign(Numbers.prototype, numberMethods)

  /** a number and a currency */
  class Money extends Numbers {}
  Object.assign(Money.prototype, moneyMethods)

  /**  */
  class Fraction extends Numbers {}
  Object.assign(Fraction.prototype, fractionMethods)

  /**  */
  class Percentage extends Numbers {}
  Object.assign(Percentage.prototype, percentageMethods)

  const docMethods = {
    /** find all numbers and values */
    numbers: function (n) {
      let m = findNumbers(this, n)
      return new Numbers(m.list, this, this.world)
    },

    /** return '4%' or 'four percent' etc*/
    percentages: function (n) {
      let m = findPercentages(this, n)
      return new Percentage(m.list, this, this.world)
    },

    /** return '3 out of 5' or '3/5' etc**/
    fractions: function (n) {
      let m = findFractions(this, n)
      return new Fraction(m.list, this, this.world)
    },

    /** number + currency pair */
    money: function (n) {
      let m = findMoney(this, n)
      return new Money(m.list, this, this.world)
    },
  }
  // aliases
  docMethods.values = docMethods.numbers
  docMethods.percents = docMethods.percentages

  Object.assign(Doc.prototype, docMethods)

  return Doc
}
module.exports = plugin
