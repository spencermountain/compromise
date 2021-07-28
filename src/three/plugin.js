import contractions from './contractions/index.js'
import selections from './selections/index.js'
import chunker from './chunker/index.js'

const plugin = function (world, View) {
  selections(world, View)
  contractions(world, View)
  chunker(world, View)
}
export default plugin
