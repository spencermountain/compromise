import out from './out/index.js'
import util from './methods/utils.js'
import match from './methods/match.js'
import sort from './methods/sort.js'
import whitespace from './methods/whitespace.js'
import split from './methods/split.js'
import tag from './tag/index.js'
const compute = {}
const methods = Object.assign({}, util, out, match, tag, sort, whitespace, split, compute)
export default (function (View) {
  Object.assign(View.prototype, methods)
})
