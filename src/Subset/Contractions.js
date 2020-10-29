const addMethod = function (Doc) {
  /**  */
  class Contractions extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
      this.contracted = null
    }
    /** turn didn't into 'did not' */
    expand() {
      this.list.forEach(p => {
        let terms = p.terms()
        //change the case?
        let isTitlecase = terms[0].isTitleCase()

        terms.forEach((t, i) => {
          //use the implicit text
          t.set(t.implicit || t.text)
          t.implicit = undefined

          //add whitespace
          if (i < terms.length - 1 && t.post === '') {
            t.post += ' '
          }
        })
        //set titlecase
        if (isTitlecase) {
          terms[0].toTitleCase()
        }
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

  Doc.prototype.contractions = function (n) {
    //find currently-contracted
    let found = this.match('@hasContraction+') //(may want to split these up)
    //todo: split consecutive contractions
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
