import selections from './selections/index.js'
import clauses from './clauses.js'

const chunker = function (View) {
  selections(View)
  clauses(View)
}
export default chunker
