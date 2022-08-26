// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

// guard against superlative+comparative forms
const toRoot = function (adj) {
  const { adjFromComparative, adjFromSuperlative } = adj.methods.two.transform
  let str = adj.text('normal')
  if (adj.has('#Comparative')) {
    return adjFromComparative(str, adj.model)
  }
  if (adj.has('#Superlative')) {
    return adjFromSuperlative(str, adj.model)
  }
  return str
}

const api = function (View) {

  class Adjectives extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Adjectives'
    }
    json(opts = {}) {
      const { adjToAdverb, adjToNoun, adjToSuperlative, adjToComparative } = this.methods.two.transform
      opts.normal = true
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        let str = toRoot(m)
        json.adjective = {
          adverb: adjToAdverb(str),
          noun: adjToNoun(str),
          superlative: adjToSuperlative(str, this.model),
          comparative: adjToComparative(str, this.model),
        }
        return json
      }, [])
    }
    adverbs() {
      return this.before('#Adverb+$').concat(this.after('^#Adverb+'))
    }
    conjugate(n) {
      const { adjToComparative, adjToSuperlative, adjToNoun, adjToAdverb } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let root = toRoot(adj)
        return {
          Adjective: root,
          Comparative: adjToComparative(root, this.model),
          Superlative: adjToSuperlative(root, this.model),
          Noun: adjToNoun(root, this.model),
          Adverb: adjToAdverb(root, this.model),
        }
      }, [])
    }
    toComparative(n) {
      const { adjToComparative } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let root = toRoot(adj)
        let str = adjToComparative(root, this.model)
        return adj.replaceWith(str)
      })
    }
    toSuperlative(n) {
      const { adjToSuperlative } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let root = toRoot(adj)
        let str = adjToSuperlative(root, this.model)
        return adj.replaceWith(str)
      })
    }
    toAdverb(n) {
      const { adjToAdverb } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let root = toRoot(adj)
        let str = adjToAdverb(root, this.model)
        return adj.replaceWith(str)
      })
    }
    toNoun(n) {
      const { adjToNoun } = this.methods.two.transform
      return getNth(this, n).map(adj => {
        let root = toRoot(adj)
        let str = adjToNoun(root, this.model)
        return adj.replaceWith(str)
      })
    }
  }

  View.prototype.adjectives = function (n) {
    let m = this.match('#Adjective')
    m = getNth(m, n)
    return new Adjectives(m.document, m.pointer)
  }
  View.prototype.superlatives = function (n) {
    let m = this.match('#Superlative')
    m = getNth(m, n)
    return new Adjectives(m.document, m.pointer)
  }
  View.prototype.comparatives = function (n) {
    let m = this.match('#Comparative')
    m = getNth(m, n)
    return new Adjectives(m.document, m.pointer)
  }
}
export default api
