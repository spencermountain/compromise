// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)
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
          term.text = term.text.split('').join('.') + '.'
          term.normal = term.normal.split('').join('.') + '.'
        })
      })
      return this
    }
  }

  View.prototype.acronyms = function (n) {
    let m = this.match('#Acronym')
    m = getNth(m, n)
    return new Acronyms(m.document, m.pointer)
  }
}
export default api
