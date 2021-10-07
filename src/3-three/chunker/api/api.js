import selections from './selections/index.js'
import clauses from './clauses.js'
import quotations from './quotations.js'

const chunker = function (View) {
  selections(View)
  clauses(View)
  quotations(View)
}
export default chunker
