import compute from './compute.js'
import api from './api.js'
import lib from './lib/index.js'

const model = {
  one: {
    typeahead: {}
  }
}
export default {
  model,
  api,
  lib,
  compute,
  hooks: ['typeahead']
}

