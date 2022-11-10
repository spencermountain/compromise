import clauses from './clauses.js'
import getChunks from './chunks.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Chunks extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Chunks'
    }
    isVerb() {
      return this.filter(c => c.has('<Verb>'))
    }
    isNoun() {
      return this.filter(c => c.has('<Noun>'))
    }
    isAdjective() {
      return this.filter(c => c.has('<Adjective>'))
    }
    // chunk-friendly debug
    debug() {
      this.toView().debug('chunks')
      return this
    }
    // overloaded - keep Sentences class
    update(pointer) {
      let m = new Chunks(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }

  View.prototype.chunks = function (n) {
    let m = getChunks(this)
    m = getNth(m, n)
    return new Chunks(this.document, m.pointer)
  }
  View.prototype.clauses = clauses
}
export default api
