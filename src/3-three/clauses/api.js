import clauses from './clauses.js'

const api = function (View) {
  View.prototype.clauses = clauses
}

export default api
