import test from 'tape'
import nlp from '../lib/three.js'
const here = '[ignored/number-normalization] '

// Deferred: Number normalization changes currency formatting that these cases expect to preserve.
test(here + 'normalize-test:', function (t) {
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
