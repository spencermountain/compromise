import compile from './compile.js'
import scan from './scan.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const api = function (View) {
  /** turn an array or object into a compressed trie*/
  View.prototype.compile = function (obj) {
    return compile(obj)
  }

  /** find all matches in this document */
  View.prototype.scan = function (input) {
    let trie = isObject(input) ? input : compile(input)
    // cache it first
    let res = scan(this, trie)
    return res
  }
}

export default {
  api,
}
