const test = require('tape')
const nlp = require('./_lib')

test('acronyms', function (t) {
  let doc = nlp(`mr. and Mrs. Smith are in the FBI and the c.i.a.`)
  doc.acronyms().stripPeriods()
  t.equal(doc.text(), 'mr. and Mrs. Smith are in the FBI and the cia', 'no-periods')

  doc.acronyms().addPeriods().addPeriods().addPeriods().addPeriods()
  t.equal(doc.text(), 'mr. and Mrs. Smith are in the F.B.I. and the c.i.a.', 'one-period')

  t.end()
})

test('acronyms-more', function (t) {
  let doc = nlp('i work for the F.B.I. in Kansas.')
  doc.acronyms().stripPeriods()
  t.equal(doc.text(), 'i work for the FBI in Kansas.', 'strip-period')

  doc.acronyms().addPeriods()
  t.equal(doc.text(), 'i work for the F.B.I. in Kansas.', 'add-period')
  t.end()
})
