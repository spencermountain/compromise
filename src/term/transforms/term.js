'use strict';
const normalize = require('./normalize');

module.exports = {

  normalize: (t) => {
    t.text = normalize(t.text)
    return t
  },

  exclamation: (t) => {
    t.text += '!'
    return t
  }

}
