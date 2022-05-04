import lib from './lib.js'
import api from './api.js'
import makeNet from './methods/compile/index.js'
import bulkMatch from './methods/matcher/index.js'
import bulkTagger from './methods/tagger/index.js'


export default {
  lib,
  api,
  methods: {
    two: {
      compile: makeNet,
      bulkMatch,
      bulkTagger,
    }
  }
}