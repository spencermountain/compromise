import select from '../_select.js'
const transforms = ['toComparative', 'toSuperlative', 'toAdverb', 'toNoun']

// guard against superlative+comparative forms
const toRoot = function (adj) {
  const { fromComparative, fromSuperlative } = adj.methods.two.transform.adjective
  const str = adj.text('normal')
  if (adj.has('#Comparative')) {
    return fromComparative(str, adj.model)
  }
  if (adj.has('#Superlative')) {
    return fromSuperlative(str, adj.model)
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
      const { toAdverb, toNoun, toSuperlative, toComparative } = this.methods.two.transform.adjective
      opts.normal = true
      return this.map(m => {
        const json = m.toView().json(opts)[0] || {}
        const str = toRoot(m)
        json.adjective = {
          adverb: toAdverb(str, this.model),
          noun: toNoun(str, this.model),
          superlative: toSuperlative(str, this.model),
          comparative: toComparative(str, this.model),
        }
        return json
      }, [])
    }
    adverbs() {
      return this.before('#Adverb+$').concat(this.after('^#Adverb+'))
    }
    conjugate(n) {
      const { toComparative, toSuperlative, toNoun, toAdverb } = this.methods.two.transform.adjective
      return this.getNth(n).map(adj => {
        const root = toRoot(adj)
        return {
          Adjective: root,
          Comparative: toComparative(root, this.model),
          Superlative: toSuperlative(root, this.model),
          Noun: toNoun(root, this.model),
          Adverb: toAdverb(root, this.model),
        }
      }, [])
    }
    toRoot(n) {
      return this.getNth(n).map(adj => {
        return adj.replaceWith(toRoot(adj))
      })
    }
  }

  // Keep generated methods non-enumerable, like the class methods above.
  transforms.forEach(name => {
    Object.defineProperty(Adjectives.prototype, name, {
      configurable: true,
      writable: true,
      value: function (n) {
        const transform = this.methods.two.transform.adjective[name]
        return this.getNth(n).map(adj => {
          return adj.replaceWith(transform(toRoot(adj), this.model))
        })
      },
    })
  })

  View.prototype.adjectives = select(Adjectives, '#Adjective')
  View.prototype.superlatives = select(Adjectives, '#Superlative')
  View.prototype.comparatives = select(Adjectives, '#Comparative')
}
export default { api }
