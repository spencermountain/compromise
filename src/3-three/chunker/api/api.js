import selections from './selections/index.js'
import clauses from './clauses.js'
import quotations from './quotations.js'

const chunker = function (View) {
  selections(View)
  View.prototype.clauses = clauses
  View.prototype.quotations = quotations
}
export default chunker
