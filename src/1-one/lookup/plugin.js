import build from './compile/build.js'
import compress from './compile/compress.js'
import scan from './scan.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const api = function (View) {
  /** turn an array or object into a compressed trie*/
  View.prototype.compile = function (obj) {
    const trie = build(obj, this.world)
    return compress(trie)
  }

  /** find all matches in this document */
  View.prototype.lookup = function (input) {
    if (!input) {
      return this.none()
    }
    if (typeof input === 'string') {
      input = [input]
    }
    let trie = isObject(input) ? input : build(input, this.world)
    // cache it first
    let res = scan(this, trie)
    return res
  }
}

export default {
  api,
}
