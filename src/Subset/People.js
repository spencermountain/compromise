const addMethod = function (Doc) {
  /**  */
  class People extends Doc {
    // honorifics(){}
    // firstNames(){}
    // lastNames(){}
    // pronouns(){}
    // toPronoun(){}
    // fromPronoun(){}
  }

  Doc.prototype.people = function (n) {
    let match = this.splitAfter('@hasComma')
    match = match.match('#Person+')

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new People(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
