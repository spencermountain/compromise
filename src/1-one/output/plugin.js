import api from './api/index.js'
import { debug, hash } from './methods/index.js'
import fromSpec from './fromSpec.js'

export default {
  lib: {
    fromSpec,
  },
  api,
  methods: {
    one: {
      hash,
      debug,
    },
  },
}
