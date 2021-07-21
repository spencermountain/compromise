const test = require('tape')
const nlp = require('./_lib')

test('misc values', function (t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.values().length, 0, 'found no values')

  doc = nlp(`seven is slightly before eleven, but after two.`)
  t.equal(doc.values().length, 3, 'found three values')

  doc = nlp('742 Evergreen Terrace')
  doc.numbers().set('eleven')
  t.equal(doc.text('trim'), '11 Evergreen Terrace', 'address can be value')
  t.end()
})

test('normalize-test:', function (t) {
  let str = 'it is 33%'
  let doc = nlp(str)
  doc.numbers().normalize()
  t.equal(doc.text(), str, str)

  str = 'it is 33°'
  doc = nlp(str)
  doc.numbers().normalize()
  t.equal(doc.text(), str, str)

  str = '₩50 or so'
  doc = nlp(str)
  doc.numbers().normalize()
  t.equal(doc.text(), str, str)

  str = '$50.00 even'
  doc = nlp(str)
  doc.numbers().normalize()
  t.equal(doc.text(), str, str)

  str = 'it is 33km from here'
  doc = nlp(str)
  doc.numbers().normalize()
  t.equal(doc.text(), 'it is 33 km from here', str)

  t.end()
})

test('misc:', function (t) {
  let str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  let m = nlp(str)
  m.values().toNumber()
  t.equal(m.out('normal'), '2500059 is bigger than 2882', str)

  str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  m = nlp(str)
  m.values().toNice()
  t.equal(m.out('text'), '2,500,059 is bigger than 2,882', str)

  str = 'doug is 5 years old'
  m = nlp(str)
  m.values().toText()
  t.equal(m.out('normal'), 'doug is five years old', str)

  t.end()
})
