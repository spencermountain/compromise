import api from './api/index.js'
import compress from './api/compile/compress.js'
import build from './api/compile/build.js'

/** pre-compile a list of matches to lookup */
const lib = {
  /** turn an array or object into a compressed trie*/
  compile: function (input) {
    const trie = build(input, this.world())
    return compress(trie)
  }
}

export default {
  api,
  lib
}
