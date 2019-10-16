const addMethod = function(Doc) {
  /**  */
  class Places extends Doc {
    // regions(){}
  }

  Doc.prototype.places = function(n) {
    let m = this.splitAfter('@hasComma')
    m = m.match('#Place+')

    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Places(m.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
