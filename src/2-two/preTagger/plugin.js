import model from './model/index.js'
import methods from './methods/index.js'
import compute from './compute/index.js'

const plugin = {
  compute,
  methods,
  model,
  hooks: ['preTagger'],//'root'
}
export default plugin
