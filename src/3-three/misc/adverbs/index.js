// return the nth elem of a doc
const api = function (View) {

  class Adverbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Adverbs'
    }
    json(opts = {}) {
      const fromAdverb = this.methods.two.transform.adjective.fromAdverb
      opts.normal = true
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        json.adverb = {
          adjective: fromAdverb(json.normal)
        }
        return json
      }, [])
    }
  }

  View.prototype.adverbs = function (n) {
    let m = this.match('#Adverb')
    m = m.getNth(n)
    return new Adverbs(m.document, m.pointer)
  }
}
export default api
