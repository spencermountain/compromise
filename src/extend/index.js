const verbs = require('./verbs')
const terms = require('./terms')

const extend = function(Doc) {
  terms(Doc)
  verbs(Doc)
  return Doc
}
module.exports = extend
