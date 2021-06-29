const out = require('./out')
const util = require('./methods/utils')
const match = require('./methods/match')
const tag = require('./tag')

const methods = Object.assign({}, util, out, match, tag)

module.exports = function (View) {
  Object.assign(View.prototype, methods)
}

// Object.keys(methods).forEach(k => console.log(`.${k}()`))
