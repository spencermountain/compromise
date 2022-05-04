import lib from './lib.js'
import makeNet from './methods/compile/index.js'
import bulkMatch from './methods/matcher/index.js'
import bulkTagger from './methods/tagger/index.js'


export default {
  lib,
  methods: {
    two: {
      compile: makeNet,
      bulkMatch,
      bulkTagger,
    }
  }
}