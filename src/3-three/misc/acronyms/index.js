import select from '../../_select.js'
import stripper from '../_lib.js'
const strip = stripper(/\./g)

const api = function (View) {

  class Acronyms extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Acronyms'
    }
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

  View.prototype.acronyms = select(Acronyms, '#Acronym')
}
export default api
