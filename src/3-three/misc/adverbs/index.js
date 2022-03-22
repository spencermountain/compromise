// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Adverbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Adverbs'
    }
    json(opts = {}) {
      const toAdj = this.methods.two.transform.advToAdjective
      opts.normal = true
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        json.adverb = {
          adjective: toAdj(json.normal)
        }
        return json
      }, [])
    }
  }

  View.prototype.adverbs = function (n) {
    let m = this.match('#Adverb')
    m = getNth(m, n)
    return new Adverbs(m.document, m.pointer)
  }
}
export default api
