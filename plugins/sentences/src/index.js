const addMethod = function(Doc) {
  /**  */
  class Sentences extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
    }
    toPastTense() {}
    toPresentTense() {}
    toFutureTense() {}
    toContinuous() {}

    toNegative() {}
    toPositive() {}

    isPassive() {}
    /** return sentences ending with '?' */
    isQuestion() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0)
        return term.hasPost('?')
      })
    }
    /** return sentences ending with '!' */
    isExclamation() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0)
        return term.hasPost('!')
      })
    }
    /** return sentences with neither a question or an exclamation */
    isStatement() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0)
        return !term.hasPost('?') && !term.hasPost('!')
      })
    }

    /** add a word to the start of this sentence */
    prepend(str) {
      // repair the titlecase
      let firstTerms = this.match('^.')
      firstTerms.not('#ProperNoun').toLowerCase()
      // actually add the word
      firstTerms.prepend(str)
      // add a titlecase
      firstTerms.terms(0).toTitleCase()
    }

    /** add a word to the end of this sentence */
    append(str) {
      this.forEach(doc => {
        let end = doc.match('.$')
        let lastTerm = end.termList(0)
        let punct = lastTerm.post
        // add punctuation to the end
        end.append(str + punct)
        // remove punctuation from the former last-term
        lastTerm.post = ' '
      })
    }

    toExclamation() {}
    toQuestion() {}
    toStatement() {}
  }

  Doc.prototype.sentences = function(n) {
    let match = this.all()

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Sentences(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
