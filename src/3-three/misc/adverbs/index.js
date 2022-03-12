// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Adverbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'adverbs'
    }
    toAdjective() {
      const toAdj = this.methods.two.transform.advToAdjective
      this.docs.forEach(terms => {
        terms[0].text = toAdj(terms[0].text)
        terms[0].normal = toAdj(terms[0].normal)
        if (terms[0].machine) {
          terms[0].machine = toAdj(terms[0].machine)
        }
      })
      return this
    }
  }

  View.prototype.adverbs = function (n) {
    let m = this.match('#Adverb')
    m = getNth(m, n)
    return new Adverbs(m.document, m.pointer)
  }
}
export default api
