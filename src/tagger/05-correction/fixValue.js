//
const fix = function(doc) {
  //half a million
  doc.match('half a? #Value').tag('Value', 'half-a-value'); //quarter not ready
  doc.match('#Value and a (half|quarter)').tag('Value', 'value-and-a-half');
  //all values are either ordinal or cardinal
  // doc.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');
  //money
  doc
    .match('#Value+ #Currency')
    .tag('Money', 'value-currency')
    .lastTerm()
    .tag('Unit', 'money-unit');
  doc.match('#Money and #Money #Currency?').tag('Money', 'money-and-money');
  //1 800 PhoneNumber
  doc.match('1 #Value #PhoneNumber').tag('PhoneNumber', '1-800-Value');
  //(454) 232-9873
  doc.match('#NumericValue #PhoneNumber').tag('PhoneNumber', '(800) PhoneNumber');
  //two hundredth
  doc
    .match('#TextValue+')
    .match('#Cardinal+ #Ordinal')
    .tag('Ordinal', 'two-hundredth');
  return doc;
};
module.exports = fix;
