import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/misc/acronym] '

test('acronyms', function (t) {
  const doc = nlp(`mr. and Mrs. Smith are in the FBI and the c.i.a.`)
  doc.acronyms().strip()
  t.equal(doc.text(), 'mr. and Mrs. Smith are in the FBI and the cia', here + 'no-periods')

  doc.acronyms().addPeriods().addPeriods().addPeriods().addPeriods()
  t.equal(doc.text(), 'mr. and Mrs. Smith are in the F.B.I. and the c.i.a.', here + 'one-period')

  t.end()
})

test('acronyms-more', function (t) {
  const doc = nlp('i work for the F.B.I. in Kansas.')
  doc.acronyms().strip()
  t.equal(doc.text(), 'i work for the FBI in Kansas.', here + 'strip-period')

  doc.acronyms().addPeriods()
  t.equal(doc.text(), 'i work for the F.B.I. in Kansas.', here + 'add-period')
  t.end()
})

test(here + 'acronym period conversion preserves surrounding text', t => {
  const cases = [
    ['The UN met today.', 'The U.N. met today.'],
    ['NASA launched a rocket.', 'N.A.S.A. launched a rocket.'],
    ['The USA won.', 'The U.S.A. won.'],
    ['Ask the FBI, then the CIA.', 'Ask the F.B.I., then the C.I.A.'],
    ['The FBI (and CIA) agreed.', 'The F.B.I. (and C.I.A.) agreed.'],
  ]
  cases.forEach(([plain, dotted]) => {
    const doc = nlp(plain)
    doc.acronyms().addPeriods()
    t.equal(doc.text(), dotted, here + 'add periods: ' + plain)
    doc.acronyms().addPeriods()
    t.equal(doc.text(), dotted, here + 'add periods is idempotent: ' + plain)
    doc.acronyms().strip()
    t.equal(doc.text(), plain, here + 'strip periods: ' + dotted)
    doc.acronyms().strip()
    t.equal(doc.text(), plain, here + 'strip is idempotent: ' + dotted)
  })
  t.end()
})

test(here + 'ordinary words and honorifics are not acronyms', t => {
  for (const input of ['', 'Alice visited London.', 'Dr. Smith met Mrs. Jones.', 'The cat sleeps.']) {
    const doc = nlp(input)
    t.equal(doc.acronyms().length, 0, here + 'no acronyms: ' + input)
    doc.acronyms().strip()
    doc.acronyms().addPeriods()
    t.equal(doc.text(), input, here + 'unchanged: ' + input)
  }
  t.end()
})

test(here + 'acronym transformation respects sentence selection', t => {
  const doc = nlp('The FBI called. The CIA replied.')
  doc.sentences(0).acronyms().addPeriods()
  t.equal(doc.text(), 'The F.B.I. called. The CIA replied.', here + 'only selected acronym changes')
  const before = doc.text()
  doc.match('missing').acronyms().strip()
  t.equal(doc.text(), before, here + 'empty selection does not change document')
  t.end()
})
