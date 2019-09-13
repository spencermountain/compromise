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

    prepend() {}
    append() {}

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
