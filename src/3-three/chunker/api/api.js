import clauses from './clauses.js'
import getChunks from './chunks.js'

const api = function (View) {
  View.prototype.chunks = getChunks
  View.prototype.clauses = clauses
}
export default api
