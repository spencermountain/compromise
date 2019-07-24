//
const fixValue = function(doc) {
  //canadian dollar, Brazilian pesos
  doc.match('#Demonym #Currency').tag('Currency', 'demonym-currency')

  let val = doc.if('#Value')
  if (val.found === true) {
    //half a million
    val.match('half a? #Value').tag('Value', 'half-a-value') //(quarter not ready)
    //five and a half
    val.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half')

    //all values are either ordinal or cardinal
    // doc.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');

    //money
    val
      .match('#Value+ #Currency')
      .tag('Money', 'value-currency')
      .lastTerm()
      .tag('Unit', 'money-unit')
    val.match('#Money and #Money #Currency?').tag('Money', 'money-and-money')

    //1 800 PhoneNumber
    val.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value')

    //(454) 232-9873
    val.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber')

    //two hundredth
    val
      .match('#TextValue+')
      .match('#Cardinal+ #Ordinal')
      .tag('Ordinal', 'two-hundredth')
  }
  return doc
}
module.exports = fixValue
