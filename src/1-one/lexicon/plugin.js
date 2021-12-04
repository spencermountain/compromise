import compute from './compute/index.js'

import lib from './lib.js'

export default {
  compute: {
    lexicon: compute
  },
  lib: lib,
  hooks: ['lexicon']
}