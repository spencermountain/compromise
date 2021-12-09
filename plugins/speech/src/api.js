const api = function (View) {
  /** */
  View.prototype.syllables = function () {
    this.compute('syllables')
    let all = []
    this.docs.forEach(terms => {
      terms.forEach(term => {
        all = all.concat(term.syllables)
      })
    })
    return all
  }
}
export default api