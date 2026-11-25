import clauses from './clauses.js'

// split sentences into clauses - uses no chunks, so any build can add it
const api = function (View) {
  View.prototype.clauses = clauses
}

export default { api }
