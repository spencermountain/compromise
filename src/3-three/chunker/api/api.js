import selections from './selections/index.js'
import clauses from './clauses.js'
import quotations from './quotations.js'
import parentheses from './parentheses.js'
import getChunks from './chunks.js'

const chunker = function (View) {
  View.prototype.chunks = function () {
    this.compute('index')
    return getChunks(this)
  }

  selections(View)
  View.prototype.clauses = clauses
  View.prototype.quotations = quotations
  View.prototype.parentheses = parentheses
}
export default chunker
