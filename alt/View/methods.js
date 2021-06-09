const util = require('./util')
const out = require('./out')
const match = require('./match')

const methods = Object.assign({}, util, out, match)

module.exports = function (View) {
  Object.assign(View.prototype, methods)
}

// Object.keys(methods).forEach(k => console.log(`.${k}()`))
