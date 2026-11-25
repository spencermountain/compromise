import api from './api.js'
import model from './model.js'

// split sentences into clauses - uses no chunks, so any build can add it
export default {
  api,
  model: { three: { clauses: model } },
}
