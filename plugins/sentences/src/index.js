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
    isQuestion() {}

    /** add a word to the start of this sentence */
    prepend(str) {
      // repair the titlecase
      let firstTerms = this.match('^.').debug()
      firstTerms.not('#ProperNoun').toLowerCase()
      // actually add the word
      firstTerms.prepend(str)
      // add a titlecase
      firstTerms.terms(0).toTitleCase()
    }
    /** add a word to the end of this sentence */
    append(str) {}

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
