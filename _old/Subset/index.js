const subsets = require('./_simple')
const subclass = [
  require('./Abbreviations'),
  require('./Acronyms'),
  require('./Clauses'),
  require('./Contractions'),
  require('./Lists'),
  require('./Nouns'),
  require('./Parentheses'),
  require('./Possessives'),
  require('./Quotations'),
  require('./Verbs'),
  require('./People'),
]

const extend = function (Doc) {
  // add basic methods
  Object.keys(subsets).forEach(k => (Doc.prototype[k] = subsets[k]))
  // add subclassed methods
  subclass.forEach(addFn => addFn(Doc))
  return Doc
}
module.exports = extend
