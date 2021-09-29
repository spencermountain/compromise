import caseFns from './case.js'
import insert from './insert.js'
import replace from './replace.js'
import remove from './remove.js'
const methods = Object.assign({}, caseFns, insert, replace, remove)

const addAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default addAPI
