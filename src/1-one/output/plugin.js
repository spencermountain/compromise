import api from './api/index.js'
import { debug, hash } from './methods/index.js'
import { fromSpec, testSpec } from './fromSpec.js'

export default {
  lib: {
    fromSpec,
    testSpec,
  },
  api,
  methods: {
    one: {
      hash,
      debug,
    },
  },
}
