const selections = [
  require('./Acronyms'),
  require('./Clauses'),
  require('./Contractions'),
  require('./Lists'),
  require('./Nouns'),
  require('./Parentheses'),
  require('./Possessives'),
  require('./Quotations'),
  require('./Verbs'),
]

const extend = function(Doc) {
  selections.forEach(addFn => addFn(Doc))
  return Doc
}
module.exports = extend
