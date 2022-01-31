import find from '../find.js'
import parseNoun from './parse.js'
import toJSON from './toJSON.js'
import toPlural from './toPlural.js'
import toSingular from './toSingular.js'

// return the nth elem of a doc
const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)
// const isObject = val => Object.prototype.toString.call(val) === '[object Object]'

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
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.noun !== true) {
          json.noun = toJSON(m)
        }
        return json
      }, [])
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
        return toPlural(m, parseNoun(m))
      })
      // return new Nouns(all.document, all.pointer)
    }

    toSingular(n) {
      return getNth(this, n).map(m => {
        let res = parseNoun(m)
        return toSingular(m, res)
      })
    }
    // create a new View, from this one
    update(pointer) {
      let m = new Nouns(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }
  View.prototype.nouns = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new Nouns(this.document, m.pointer)
  }
}
export default api
