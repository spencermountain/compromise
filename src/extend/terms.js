const addTerms = function(Doc) {
  /**  */
  class Terms extends Doc {
    cool() {
      return this
    }
  }

  Doc.prototype.terms = function(n) {
    let terms = this.match('.')
    if (typeof n === 'number') {
      terms = terms.get(n)
    }
    return new Terms(terms.list, terms, this.world)
  }
}
module.exports = addTerms
