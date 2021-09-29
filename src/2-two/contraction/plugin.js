import api from './api/index.js'
import model from './model/index.js'
import compute from './compute/index.js'

const plugin = {
  model: model,
  compute: compute,
  api: api,
  hooks: ['contractions'],
}
export default plugin
