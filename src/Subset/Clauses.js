const addMethod = function(Doc) {
  /** split into approximate sub-sentence phrases */
  Doc.prototype.clauses = function(n) {
    let commas = this.match('@hasComma')
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
