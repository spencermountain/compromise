const addMethod = function(Doc) {
  /**  */
  class Organizations extends Doc {
    // normalize(){}
  }

  Doc.prototype.organizations = function(n) {
    let match = this.clauses()
    match = match.match('#Organization+')

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Organizations(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
