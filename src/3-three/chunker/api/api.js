import select from '../../_select.js'
import clauses from './clauses.js'
import getChunks from './chunks.js'

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
    isPivot() {
      return this.filter(c => c.has('<Pivot>'))
    }
    // chunk-friendly debug
    debug() {
      this.toView().debug('chunks')
      return this
    }
    // overloaded - keep Sentences class
    update(pointer) {
      const m = new Chunks(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }

  View.prototype.chunks = select(Chunks, getChunks, true)
  View.prototype.clauses = clauses
}
export default api
