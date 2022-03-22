// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Adjectives extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'adjectives'
    }
    json(opts = {}) {
      const { adjToAdverb, adjToNoun } = this.methods.two.transform
      opts.normal = true
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        json.adjective = {
          adverb: adjToAdverb(json.normal),
          noun: adjToNoun(json.normal),
        }
        return json
      }, [])
    }
  }

  View.prototype.adjectives = function (n) {
    let m = this.match('#Adjective')
    m = getNth(m, n)
    return new Adjectives(m.document, m.pointer)
  }
}
export default api
