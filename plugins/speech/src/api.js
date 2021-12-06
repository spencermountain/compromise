const api = function (View) {
  /** */
  View.prototype.syllables = function () {
    this.compute('syllables')
    return this.docs.map(terms => {
      let arr = terms.map(term => term.syllables.join(' '))
      return arr.join(' ')
    })
  }
}
export default api