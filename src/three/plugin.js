import selectionApi from './selections/index.js'
import chunkApi from './chunker/index.js'
import View from '../View.js'

const plugin = function () {
  selectionApi(View)
  chunkApi(View)
}
export default plugin
