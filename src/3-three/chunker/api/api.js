import select from '../../_select.js'
import keepClass from '../../_lib.js'
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
  }
  keepClass(Chunks)

  View.prototype.chunks = select(Chunks, getChunks, true)
  View.prototype.clauses = clauses
}
export default api
