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

  /** find all numbers and values */
  Doc.prototype.numbers = function(n) {
    let m = findNumbers(this, n)
    return new Numbers(m.list, this, this.world)
  }
  // alias for reverse-compatibility
  Doc.prototype.values = Doc.prototype.numbers

  /** money + currency pair */
  Doc.prototype.money = function(n) {
    let m = this.numbers(n).if('#Money')
    return new Numbers(m.list, this, this.world)
  }

  return Doc
}
module.exports = addMethod
