import api from './api/index.js'

/** pre-compile a list of matches to lookup */
const lib = {
  compile: function (input) {
    return this().compile(input)
  }
}

export default {
  api,
  lib
}
