const selections = [
  require('./Acronyms'),
  require('./Adjectives'),
  require('./Clauses'),
  require('./Contractions'),
  require('./Parentheses'),
  require('./Possessives'),
  require('./Lists'),
  require('./Quotations'),
  require('./Verbs'),
]

const extend = function(Doc) {
  selections.forEach(addFn => addFn(Doc))
  return Doc
}
module.exports = extend
