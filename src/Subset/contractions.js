const addMethod = function(Doc) {
  /**  */
  class Contractions extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.contracted = null
    }
    expand() {
      this.list.forEach(p => {
        p.terms().forEach(t => {
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
  // const findExpanded = r => {
  //   let remain = r.not('#Contraction')
  //   let m = remain.match('(#Noun|#QuestionWord) (#Copula|did|do|have|had|could|would|will)')
  //   m.concat(remain.match('(they|we|you|i) have'))
  //   m.concat(remain.match('i am'))
  //   m.concat(remain.match('(#Copula|#Modal|do|does|have|has|can|will) not'))
  //   return m
  // }

  Doc.prototype.contractions = function(n) {
    //find currently-contracted
    let found = []
    // let matches = this.match('@hasContraction')
    // matches.list.forEach(p => {
    //   let pool = p.pool
    //   console.log(pool)
    // })

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
