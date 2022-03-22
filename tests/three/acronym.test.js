import test from 'tape'
import nlp from './_lib.js'
const here = '[three/acronym] '

test('acronyms', function (t) {
  let doc = nlp(`mr. and Mrs. Smith are in the FBI and the c.i.a.`)
  doc.acronyms().strip()
  t.equal(doc.text(), 'mr. and Mrs. Smith are in the FBI and the cia', here + 'no-periods')

  doc.acronyms().addPeriods().addPeriods().addPeriods().addPeriods()
  t.equal(doc.text(), 'mr. and Mrs. Smith are in the F.B.I. and the c.i.a.', here + 'one-period')

  t.end()
})

test('acronyms-more', function (t) {
  let doc = nlp('i work for the F.B.I. in Kansas.')
  doc.acronyms().strip()
  t.equal(doc.text(), 'i work for the FBI in Kansas.', here + 'strip-period')

  doc.acronyms().addPeriods()
  t.equal(doc.text(), 'i work for the F.B.I. in Kansas.', here + 'add-period')
  t.end()
})
