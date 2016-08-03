'use strict';
const parseUrl = require('./parseUrl')
const info = {
  parseUrl: (t) => {
    return parseUrl(t.text)
  }
}
module.exports = info
