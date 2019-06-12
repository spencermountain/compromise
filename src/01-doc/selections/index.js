const findMethods = require('./find')

const addSelections = function(Doc) {
  Object.assign(Doc.prototype, findMethods)
  return Doc
}
module.exports = addSelections
