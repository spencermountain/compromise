import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-misc] '

test('misc values', function (t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.values().length, 0, here + 'found no values')

  doc = nlp(`seven is slightly before eleven, but after two.`)
  t.equal(doc.values().length, 3, here + 'found three values')

  doc = nlp('742 Evergreen Terrace')
  doc.numbers().set('eleven')
  t.equal(doc.text('trim'), '11 Evergreen Terrace', here + 'address can be value')
  t.end()
})

// test('normalize-test:', function (t) {
//   let str = 'it is 33%'
//   let doc = nlp(str)
//   doc.numbers().normalize()
//   t.equal(doc.text(), str, str)

//   str = 'it is 33°'
//   doc = nlp(str)
//   doc.numbers().normalize()
//   t.equal(doc.text(), str, str)

//   str = '₩50 or so'
//   doc = nlp(str)
//   doc.numbers().normalize()
//   t.equal(doc.text(), str, str)

//   str = '$50.00 even'
//   doc = nlp(str)
//   doc.numbers().normalize()
//   t.equal(doc.text(), str, str)

//   str = 'it is 33km from here'
//   doc = nlp(str)
//   doc.numbers().normalize()
//   t.equal(doc.text(), 'it is 33 km from here', str)

//   t.end()
// })

test('freeze:', function (t) {
  let doc = nlp('five hundred fifty nine is more than fifty three')
  doc.values().toNumber()
  t.equal(doc.text(), '559 is more than 53', here + 'freeze-toNumb')

  doc = nlp('five hundred fifty nine is more than fifty three')
  doc.values().set(4)
  t.equal(doc.text(), 'four is more than four', here + 'freeze-set')

  doc = nlp('five hundred fifty eight is more than eighteen')
  doc.values().add(4)
  t.equal(doc.text(), 'five hundred and sixty two is more than twenty two', here + 'freeze-add')

  t.end()
})
test('runtime error:', function (t) {
  let txt = ` for three out of every four and the first four . `
  let doc = nlp(txt)
  doc.numbers().toNumber()
  t.ok(true, here + 'doesnt throw')
  t.end()
})

test('misc:', function (t) {
  let str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  let m = nlp(str)
  m.values().toNumber()
  t.equal(m.out('normal'), '2500059 is bigger than 2882', here + str)
  str = '2 million five hundred thousand and fifty nine is bigger than 2882'
  m = nlp(str)
  m.values().toNice()
  t.equal(m.out('text'), '2,500,059 is bigger than 2,882', here + str)

  str = 'doug is 5 years old'
  m = nlp(str)
  m.values().toText()
  t.equal(m.out('normal'), 'doug is five years old', here + str)

  t.end()
})

test('number-text mixes:', function (t) {
  let doc = nlp('2 million')
  doc.values().toNumber()
  t.equal(doc.text(), '2000000', here + '2 mil')

  doc = nlp('2 million')
  doc.values().add(3)
  t.equal(doc.text(), 'two million and three', here + '2 mil and 3')
  t.end()
})

test('prefix/suffix:', function (t) {
  let doc = nlp('$7,938')
  doc.numbers().add(1)
  t.equal(doc.text(), '$7,939', here + 'add money')

  doc = nlp('7,938kg')
  doc.numbers().minus(1)
  t.equal(doc.text(), '7,937 kg', here + 'minus w/ unit')

  doc = nlp('938.4cm')
  doc.numbers().minus(1)
  t.equal(doc.text(), '937.4 cm', here + 'minus w/ decimal')

  doc = nlp('33rd')
  doc.numbers().add(1)
  t.equal(doc.text(), '34th', here + 'add ordinal')
  t.end()
})
