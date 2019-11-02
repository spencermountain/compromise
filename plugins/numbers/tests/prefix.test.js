const test = require('tape')
const nlp = require('./_lib')

test('prefix:', function(t) {
  let doc = nlp('it was almost $400')
  doc.values().toText()
  t.equals(doc.text(), 'it was almost four hundred dollars', '$400')

  t.end()
})

test('suffix:', function(t) {
  let doc = nlp('it was 400USD')
  doc.values().toText()
  t.equals(doc.text(), 'it was four hundred USD', '400usd')

  doc = nlp('it was 4.5m')
  doc.values().toText()
  t.equals(doc.text(), 'it was four million five hundred thousand', '4.5m')

  doc = nlp('it was $47.5m')
  doc.values().toText()
  t.equals(doc.text(), 'it was forty seven million five hundred thousand dollars', '$47.5m')

  doc = nlp('i ran 25km uphill')
  doc.values().toText()
  t.equals(doc.text(), 'i ran twenty five kilometres uphill', '25km')

  doc = nlp('it was 400s!')
  doc.values().toText()
  t.equals(doc.text(), 'it was four hundred seconds!', '400s!')

  t.end()
})
