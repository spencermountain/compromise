//
const fixValue = function(doc) {
  let val = doc.if('#Value')
  if (val.found === true) {
    //1 800 PhoneNumber
    val.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value')
    //(454) 232-9873
    val.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber')
    //three trains
    val.match('#Value [#PresentTense]').tag('Plural', 'value-presentTense')
    //money
    val
      .match('#Value+ #Currency')
      .tag('Money', 'value-currency')
      .lastTerm()
      .tag('Unit', 'money-unit')
  }
  return doc
}
module.exports = fixValue
