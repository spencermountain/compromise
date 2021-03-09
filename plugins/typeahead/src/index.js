const tryPrefix = require('./tryPrefix')
const getPrefixes = require('./getPrefixes')

const isObject = function (obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

const plugin = function (Doc, world, _nlp) {
  /** add words that can be predicted from their prefix */
  _nlp.typeahead = function (arr = [], opts = {}) {
    let lex = {}
    // wiggle-out our params
    if (isObject(arr)) {
      lex = arr
      arr = Object.keys(lex)
    }
    // pre-compute all prefixes
    world.prefixes = getPrefixes(arr, opts)
    // each keypress, try the end
    world.postProcess((doc) => {
      tryPrefix(doc, lex)
    })
  }
  // alias
  _nlp.typeAhead = Doc.prototype.typeahead
}
module.exports = plugin
