const selections = [require('./acronyms'), require('./contractions')]

const extend = function(Doc) {
  selections.forEach(addFn => addFn(Doc))
  return Doc
}
module.exports = extend
