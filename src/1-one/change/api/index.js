import caseFns from './case.js'
import insert from './insert.js'
import replace from './replace.js'
import remove from './remove.js'
import whitespace from './whitespace.js'
import sort from './sort.js'
import fork from './fork.js'
import concat from './concat.js'
import freeze from './freeze.js'

const methods = Object.assign({}, caseFns, insert, replace, remove, whitespace, sort, fork, concat, freeze)

const addAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default addAPI
