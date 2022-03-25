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
    adverbs() {
      return this.before('#Adverb+$').concat(this.after('^#Adverb+'))
    }

    toAdverb(n) {
      const { adjToAdverb } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let adv = adjToAdverb(adj.text('normal'))
        return adj.replaceWith(adv)
      })
    }

    toNoun(n) {
      const { adjToNoun } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let adv = adjToNoun(adj.text('normal'))
        return adj.replaceWith(adv)
      })
    }
  }

  View.prototype.adjectives = function (n) {
    let m = this.match('#Adjective')
    m = getNth(m, n)
    return new Adjectives(m.document, m.pointer)
  }
}
export default api
