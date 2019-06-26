const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {
    conjugate() {
      console.log('hi')
      return this
    }
  }

  Doc.prototype.verbs = function(n) {
    let verbs = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
    verbs = verbs.splitAfter('#Comma')
    verbs = verbs.if('#Verb') //this should be (much) smarter
    if (typeof n === 'number') {
      verbs = verbs.get(n)
    }
    return new Verbs(verbs.list, verbs, this.world)
  }
  return Doc
}
module.exports = addMethod
