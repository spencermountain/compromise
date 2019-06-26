const selections = [require('./contractions'), require('./acronyms')]

const extend = function(Doc) {
  selections.forEach(addFn => addFn(Doc))
  return Doc
}
module.exports = extend
