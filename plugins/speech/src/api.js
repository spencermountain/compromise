const api = function (View) {
  /** */
  View.prototype.syllables = function () {
    this.compute('syllables')
    let all = []
    this.docs.forEach(terms => {
      let some = []
      terms.forEach(term => {
        some = some.concat(term.syllables)
      })
      if (some.length > 0) {
        all.push(some)
      }
    })
    return all
  }
  /** */
  View.prototype.soundsLike = function () {
    this.compute('soundsLike')
    let all = []
    this.docs.forEach(terms => {
      let some = []
      terms.forEach(term => {
        some = some.concat(term.soundsLike)
      })
      if (some.length > 0) {
        all.push(some)
      }
    })
    return all
  }
}
export default api