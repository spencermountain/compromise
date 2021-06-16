const util = require('./util')
const out = require('./out')
const match = require('./match')
const tag = require('./tag')

const methods = Object.assign({}, util, out, match, tag)

module.exports = function (View) {
  Object.assign(View.prototype, methods)
}

// Object.keys(methods).forEach(k => console.log(`.${k}()`))
