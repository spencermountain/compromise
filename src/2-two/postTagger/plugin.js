import model from './model/index.js'
import compute from './compute/index.js'
import methods from './methods/index.js'

const plugin = {
  compute: compute,
  methods: methods,
  model: model,
  hooks: ['postTagger'],
}
export default plugin
