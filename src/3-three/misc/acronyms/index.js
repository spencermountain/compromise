import select from '../../_select.js'
// return the nth elem of a doc
const hasPeriod = /\./g

const api = function (View) {

  class Acronyms extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Acronyms'
    }
    strip() {
      this.docs.forEach(terms => {
        terms.forEach(term => {
          term.text = term.text.replace(hasPeriod, '')
          term.normal = term.normal.replace(hasPeriod, '')
        })
      })
      return this
    }
    addPeriods() {
      this.docs.forEach(terms => {
        terms.forEach(term => {
          term.text = term.text.replace(hasPeriod, '')
          term.normal = term.normal.replace(hasPeriod, '')
          // Reuse the sentence period so strip() still preserves punctuation.
          const ending = term.post.startsWith('.') ? '' : '.'
          term.text = term.text.split('').join('.') + ending
          term.normal = term.normal.split('').join('.') + ending
        })
      })
      return this
    }
  }

  View.prototype.acronyms = select(Acronyms, '#Acronym')
}
export default api
