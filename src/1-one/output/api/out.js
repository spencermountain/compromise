import debug from './debug/index.js'
import out from './lib/out.js'
import json from './lib/json.js'

const methods = {
  /** return data */
  json: function (n) {
    let res = json(this, n)
    if (typeof n === 'number') {
      return res[n]
    }
    return res
  },

  /** */
  debug: debug,
  /** */
  out: out,
}
// aliases
methods.data = methods.json

export default methods
