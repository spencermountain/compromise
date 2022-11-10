import getFacts from './statement/index.js'


const api = function (View) {
  /** */
  View.prototype.facts = function () {
    let facts = []
    this.sentences().forEach(s => {
      facts = facts.concat(getFacts(s))
    })
    return facts
  }
}
export default api
