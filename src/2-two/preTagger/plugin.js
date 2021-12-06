import model from './model/index.js'
import methods from './methods/index.js'
import compute from './compute/index.js'
import tags from './tagSet/index.js'

const plugin = {
  compute,
  methods,
  model,
  tags,
  hooks: ['preTagger'],//'root'
}
export default plugin
