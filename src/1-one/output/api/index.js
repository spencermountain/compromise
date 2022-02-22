import out from './out.js'
import text from './text.js'
import json from './json.js'
import html from './html.js'

const methods = Object.assign({}, out, text, json, html)
// aliases
methods.data = methods.json

const addAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default addAPI
