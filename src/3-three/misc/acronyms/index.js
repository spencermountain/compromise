import select from '../../_select.js'
import stripper from '../_lib.js'
const strip = stripper(/\./g)

const api = function (View) {

  class Acronyms extends View {
    strip() {
      return strip(this)
    }
    addPeriods() {
      strip(this)
      this.docs.forEach(terms => {
        terms.forEach(term => {
          // Reuse the sentence period so strip() still preserves punctuation.
          const ending = term.post.startsWith('.') ? '' : '.'
          term.text = term.text.split('').join('.') + ending
          term.normal = term.normal.split('').join('.') + ending
        })
      })
      return this
    }
  }
  Acronyms.prototype.viewType = 'Acronyms'

  View.prototype.acronyms = select(Acronyms, '#Acronym')
}
export default api
