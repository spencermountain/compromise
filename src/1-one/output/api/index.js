import out from './out.js'
import text from './text.js'
import json from './json.js'

const methods = Object.assign({}, out, text, json)

// aliases
methods.data = methods.json

const addAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default addAPI
