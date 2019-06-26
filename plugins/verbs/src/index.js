const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {
    // conjugation(){}
    // conjugate(){}
    // isPlural(){}
    // isSingular(){}
    // isNegative(){}
    // isPositive(){}
    // toNegative(){}
    // toPositive(){}
    // toPastTense(){}
    // toPresentTense(){}
    // toFutureTense(){}
    // toInfinitive(){}
    // toGerund(){}
    // asAdjective(){}
  }

  Doc.prototype.verbs = function(n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
    match = match.splitAfter('#Comma')
    match.list.forEach(ts => {
      ts.terms.forEach(t => {
        if (t.whitespace.before.match('/')) {
          match.splitOn(t.normal)
        }
      })
    })
    match = match.if('#Verb') //this should be (much) smarter

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Verbs(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
