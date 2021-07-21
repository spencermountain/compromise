import contractions from './contractions/index.js'
import selections from './selections/_selections.js'
import abbreviations from './selections/abbreviations.js'
import chunker from './chunker.js'

const plugin = function (world, View) {
  selections(world, View)
  abbreviations(world, View)
  contractions(world, View)
  chunker(world, View)
}
export default plugin
