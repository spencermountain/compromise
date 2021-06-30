import out from './out/index.js'
import util from './methods/utils.js'
import * as match from './methods/match.js'
import tag from './tag/index.js'
const methods = Object.assign({}, util, out, match, tag)
export default (function (View) {
  Object.assign(View.prototype, methods)
})
