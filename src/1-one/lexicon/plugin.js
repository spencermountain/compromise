import compute from './compute/index.js'
import methods from './methods/index.js'
import lib from './lib.js'

const model = {
  one: {
    lexicon: {}, //setup blank lexicon
    _multiCache: {},
  }
}

export default {
  model,
  methods,
  compute,
  lib,
  hooks: ['lexicon']
}