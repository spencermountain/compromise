const addMethod = function(Doc) {
  /**  */
  class Places extends Doc {
    // regions(){}
  }

  Doc.prototype.organizations = function(n) {
    let match = this.clauses()
    match = match.match('#Place+')

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Places(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
