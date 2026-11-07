import select from '../_select.js'
const transforms = ['toComparative', 'toSuperlative', 'toAdverb', 'toNoun']

// guard against superlative+comparative forms
const toRoot = function (adj) {
  const { fromComparative, fromSuperlative } = adj.methods.two.transform.adjective
  const str = adj.text('normal')
  if (adj.has('#Comp')) {
    return fromComparative(str, adj.model)
  }
  if (adj.has('#Sup')) {
    return fromSuperlative(str, adj.model)
  }
  return str
}

// the four derived forms of an adjective root
const forms = function (root, adj) {
  const { toAdverb, toNoun, toSuperlative, toComparative } = adj.methods.two.transform.adjective
  const { model } = adj
  return {
    adverb: toAdverb(root, model),
    noun: toNoun(root, model),
    superlative: toSuperlative(root, model),
    comparative: toComparative(root, model),
  }
}

const api = function (View) {

  class Adjectives extends View {
    json(opts = {}) {
      opts.normal = true
      return this.map(m => {
        const json = m.toView().json(opts)[0] || {}
        json.adjective = forms(toRoot(m), m)
        return json
      }, [])
    }
    adverbs() {
      return this.before('#Adv+$').concat(this.after('^#Adv+'))
    }
    conjugate(n) {
      return this.getNth(n).map(adj => {
        const root = toRoot(adj)
        const f = forms(root, adj)
        return {
          Adjective: root,
          Comparative: f.comparative,
          Superlative: f.superlative,
          Noun: f.noun,
          Adverb: f.adverb,
        }
      }, [])
    }
    toRoot(n) {
      return this.getNth(n).map(adj => {
        return adj.replaceWith(toRoot(adj))
      })
    }
  }
  Adjectives.prototype.viewType = 'Adjectives'

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

  View.prototype.adjectives = select(Adjectives, '#Adj')
  View.prototype.superlatives = select(Adjectives, '#Sup')
  View.prototype.comparatives = select(Adjectives, '#Comp')
}
export default { api }
