import selections from './selections/index.js'
import clauses from './clauses.js'
import getChunks from './chunks.js'

const api = function (View) {
  selections(View)
  View.prototype.chunks = getChunks
  View.prototype.clauses = clauses
}
export default api
