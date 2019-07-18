const addMethod = function(Doc) {
  /**  */
  class Contractions extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.contracted = null
    }
    // expand() {}
    // contract() {}
    // expanded() {}
    // contracted() {}
  }

  //find contractable, expanded-contractions
  const findExpanded = r => {
    let remain = r.not('#Contraction')
    let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
    m.concat(remain.match('(they|we|you|i) have'))
    m.concat(remain.match('i am'))
    m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
    return m
  }

  Doc.prototype.acronyms = function(n) {
    //find currently-contracted
    let found = this.match('#Contraction #Contraction #Contraction?')
    found.list = found.list.map(ts => {
      let c = new Contractions(ts.terms, ts.world, ts.refText, ts.refTerms)
      c.contracted = true
      return c
    })
    //find currently-expanded
    let expanded = findExpanded(this)
    expanded.list.forEach(ts => {
      let c = new Contractions(ts.terms, ts.world, ts.refText, ts.refTerms)
      c.contracted = false
      found.list.push(c)
    })
    found.sort('chronological')
    //get nth element
    if (typeof n === 'number') {
      found = found.get(n)
    }
    return new Contractions(found.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
