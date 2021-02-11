const tagMoney = function (doc) {
  const here = 'money-tagger'
  //one hundred and seven dollars
  doc.match('#Money and #Money #Currency?').tag('Money', 'money-and-money')
  // $5.032 is invalid money
  doc
    .match('#Money')
    .not('#TextValue')
    .match('/\\.[0-9]{3}$/')
    .unTag('#Money', 'three-decimal money')
  // cleanup currency false-positives
  doc.ifNo('#Value').match('#Currency #Verb').unTag('Currency', 'no-currency')
  // 6 dollars and 5 cents
  doc.match('#Value #Currency [and] #Value (cents|ore|centavos|sens)', 0).tag('Money', here)
  // maybe currencies
  let m = doc.match('[<num>#Value] [<currency>(mark|rand|won|rub|ore)]')
  m.group('num').tag('Money', here)
  m.group('currency').tag('Currency', here)
  return doc
}
module.exports = tagMoney
