import lib from './lib.js'
import api from './api.js'
import methods from './methods/index.js'

let { makeNet, bulkMatch, bulkTagger } = methods

export default {
  lib,
  api,
  methods: {
    one: { makeNet },
    two: { bulkMatch, bulkTagger }
  }
}