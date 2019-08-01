const selections = [require('./acronyms'), require('./contractions'), require('./parentheses')]

const extend = function(Doc) {
  selections.forEach(addFn => addFn(Doc))
  return Doc
}
module.exports = extend
