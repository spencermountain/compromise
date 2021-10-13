import find from '../find.js'
import parseNoun from './parse.js'
import toJSON from './toJSON.js'

// return the nth elem of a doc
const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  class Nouns extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }

    parse(n) {
      return getNth(this, n).map(parseNoun)
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.json(opts)[0] || {}
        if (opts && opts.noun !== true) {
          json.noun = toJSON(m)
        }
        return json
      })
    }

    isPlural(n) {
      let arr = this.filter(m => parseNoun(m).isPlural)
      return getNth(arr, n)
    }

    adjectives(n) {
      let list = this.update([])
      this.forEach(m => {
        let adj = parseNoun(m).adjectives
        if (adj.found) {
          list = list.concat(adj)
        }
      })
      return getNth(list, n)
    }

    toPlural(n) {
      return getNth(this, n).map(m => {
        let res = parseNoun(m)
        // already plural
        if (res.isPlural) {
          return m
        }
        return m
      })
    }
  }

  View.prototype.nouns = function (n) {
    this.compute('chunks')
    let m = find(this)
    m = getNth(m, n)
    return new Nouns(this.document, m.pointer)
  }
}
export default api
