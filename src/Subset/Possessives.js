const addMethod = function (Doc) {
  /**  */
  class Possessives extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.contracted = null
    }
    /** turn didn't into 'did not' */
    strip() {
      this.list.forEach(p => {
        let terms = p.terms()
        terms.forEach(t => {
          let str = t.text.replace(/'s$/, '')
          t.set(str || t.text)
        })
      })
      return this
    }
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

  Doc.prototype.possessives = function (n) {
    //find currently-contracted
    let found = this.match('#Noun+? #Possessive')
    //todo: split consecutive contractions
    if (typeof n === 'number') {
      found = found.get(n)
    }
    return new Possessives(found.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
