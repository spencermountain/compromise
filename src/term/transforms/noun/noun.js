'use strict';
// const normalize = require('./normalize');

module.exports = {

  pluralize: (t) => {
    t.text += 's'
    return t
  },
  singularize: (t) => {
    t.text = t.text.replace(/s$/)
    return t
  }

}
