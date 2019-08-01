const addMethod = function(Doc) {
  /**  */
  class Contractions extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.contracted = null
    }
    expand() {
      console.log('hi')
      this.list.forEach(p => {
        p.terms().forEach(t => {
          console.log(t)
          t.text = t.implicit || t.text
        })
      })
      return this
    }
    contract() {}

    isExpanded() {}
    isContracted() {}
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

  Doc.prototype.contractions = function(n) {
    // this.debug()
    //find currently-contracted
    let found = this.match('#Contraction #Contraction #Contraction?')
    // found.list = found.list.map(ts => {
    //   // let c = new Contractions(ts.terms, ts.world, ts.refText, ts.refTerms)
    //   c.contracted = true
    //   return c
    // })
    //find currently-expanded
    // let expanded = findExpanded(this)
    // found.concat(expanded)

    // found.sort('chronological')
    //get nth element
    if (typeof n === 'number') {
      found = found.get(n)
    }
    return new Contractions(found.list, this, this.world)
  }

  //aliases
  Doc.prototype.expanded = Doc.prototype.isExpanded
  Doc.prototype.contracted = Doc.prototype.isContracted
  return Doc
}
module.exports = addMethod
