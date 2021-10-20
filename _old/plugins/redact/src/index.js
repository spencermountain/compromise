const redact = require('./redact')

const defaults = {
  dates: '▇',
  numbers: false,
  money: '▇',
  people: '▇',
  places: '▇',
  organizations: '▇',
}

const addMethod = function(Doc) {
  /** remove or obfuscate certain parts of the text */
  Doc.prototype.redact = function(options) {
    options = Object.assign({}, defaults, options)
    return redact(this, options)
  }

  return Doc
}
module.exports = addMethod
