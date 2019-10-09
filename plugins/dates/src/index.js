const addMethods = function(Doc) {
  /**  */
  class Dates extends Doc {
    longForm() {}
    shortForm() {}
  }

  Doc.prototype.dates = function(n) {
    let r = this.clauses()
    let dates = r.match('#Date+')
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    return new Dates(dates.list, this, this.world)
  }
}

module.exports = addMethods
