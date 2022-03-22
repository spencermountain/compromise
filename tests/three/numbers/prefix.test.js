import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-prefix] '

test('prefix:', function (t) {
  let doc = nlp('it was almost $400')
  doc.values().toText()
  t.equals(doc.text(), 'it was almost four hundred dollars', here + '$400')

  t.end()
})

test('suffix:', function (t) {
  let doc = nlp('it was 400USD')
  doc.values().toText()
  t.equals(doc.text(), 'it was four hundred usd', here + '400usd')

  // doc = nlp('it was 4.5m')
  // doc.values().toText()
  // t.equals(doc.text(), 'it was four million five hundred thousand', here + '4.5m')

  // doc = nlp('it was $47.5m')
  // doc.values().toText()
  // t.equals(doc.text(), 'it was forty seven million five hundred thousand dollars', here + '$47.5m')

  doc = nlp('i ran 25km uphill')
  doc.values().toText()
  t.equals(doc.text(), 'i ran twenty five kilometres uphill', here + '25km')

  // doc = nlp('it was 400s!')
  // doc.values().toText()
  // t.equals(doc.text(), 'it was four hundred s!', here + '400s!')

  t.end()
})
