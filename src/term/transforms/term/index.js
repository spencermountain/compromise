'use strict'
const normalize = require('./normalize')

module.exports = {
  Normalize: (t) => {
    t.text += normalize(t.text)
    return t
  },
  Exclaim: (t) => {
    t.text += '!'
    return t
  }
}
