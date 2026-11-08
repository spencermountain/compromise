import build from './buildTrie/index.js'
import scan from './scan.js'

import isObject from '../../../API/_is.js'

export default function (View) {

  /** find all matches in this document */
  View.prototype.lookup = function (input, opts = {}) {
    if (!input) {
      return this.none()
    }
    if (typeof input === 'string') {
      input = [input]
    }
    const trie = isObject(input) ? input : build(input, this.world)
    let res = scan(this, trie, opts)
    res = res.settle()
    return res
  }
}