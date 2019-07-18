const addMethod = function(Doc) {
  /**  */
  class Acronyms extends Doc {
    // stripPeriods() {//TODO:finish
    //   return this
    // }
    // addPeriods() {
    //   return this
    // }
  }

  Doc.prototype.acronyms = function(n) {
    let match = this.match('#Acronym')
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Acronyms(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
