const addMethod = function(Doc) {
  /**  */
  class Gram extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      //string to sort/uniq by
      this.key = this.out('normal')
      //bigram/trigram/etc
      this.size = list.length
      //number of occurances
      this.count = 1
    }
    // function()
  }

  Doc.prototype.ngrams = function(n, obj) {
    let match = this.match('.')
    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Gram(match.list, this, this.world)
  }

  Doc.prototype.unigrams = function(n) {
    let match = this.match('.')
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Gram(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
