const addMethod = function(Doc) {
  /** split into approximate sub-sentence phrases */
  Doc.prototype.clauses = function(n) {
    // an awkward way to disambiguate a comma use
    let commas = this.if('@hasComma')
      .notIf('@hasComma @hasComma') //fun, cool...
      .notIf('@hasComma . .? (and|or) .') //cool, and fun
      .notIf('(#City && @hasComma) #Country') //'toronto, canada'
      .notIf('(#Date && @hasComma) #Year') //'july 6, 1992'
      .match('@hasComma')
    let found = this.splitAfter(commas)

    let quotes = found.quotations()
    found = found.splitOn(quotes)

    let parentheses = found.parentheses()
    found = found.splitOn(parentheses)

    if (typeof n === 'number') {
      found = found.get(n)
    }
    return new Doc(found.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
