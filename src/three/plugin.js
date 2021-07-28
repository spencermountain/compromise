import selections from './selections/index.js'
import chunker from './chunker/index.js'
import View from '../View.js'

const plugin = function (world) {
  selections(world, View)
  chunker(world, View)
}
export default plugin
