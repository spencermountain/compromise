import model from './model/index.js'
import compute from './compute/index.js'
import methods from './methods/index.js'
import api from './api.js'

const plugin = {
  api,
  compute,
  methods,
  model,
  hooks: ['postTagger'],
}
export default plugin
