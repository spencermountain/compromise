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
    // chunk-friendly debug
    debug() {
      this.toView().debug('chunks')
      return this
    }
  }
  keepClass(Chunks)
  // isVerb(), isNoun(), isAdjective(), isPivot()
  'Verb Noun Adjective Pivot'.split(' ').forEach(name => {
    Chunks.prototype['is' + name] = function () {
      return this.filter(c => c.has(`<${name}>`))
    }
  })

  View.prototype.chunks = select(Chunks, getChunks, true)
  View.prototype.clauses = clauses
}
export default api
