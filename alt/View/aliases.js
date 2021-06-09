const m = require('./methods')

const aliases = {
  get: m.eq,
}

module.exports = function (View) {
  Object.assign(View.prototype, aliases)
}
