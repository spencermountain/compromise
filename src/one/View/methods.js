import out from './out/index.js'
import util from './methods/utils.js'
import match from './methods/match.js'
import sort from './methods/sort.js'
import tag from './tag/index.js'

const methods = Object.assign({}, util, out, match, tag, sort)
export default (function (View) {
  Object.assign(View.prototype, methods)
})
