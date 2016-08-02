'use strict';
const toAdjective = require('./toAdjective')
const info = {
  adjectiveForm: (t) => {
    return toAdjective(t.normal)
  }
}
module.exports = info
