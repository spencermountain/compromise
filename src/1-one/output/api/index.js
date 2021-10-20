import out from './out.js'
import text from './text.js'

const methods = Object.assign({}, out, text)

const addAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default addAPI
