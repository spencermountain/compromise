import selections from './selections/index.js'
import clauses from './clauses.js'
import quotations from './quotations.js'
import parentheses from './parentheses.js'

const chunker = function (View) {
  selections(View)
  View.prototype.clauses = clauses
  View.prototype.quotations = quotations
  View.prototype.parentheses = parentheses
}
export default chunker
