const test = require('tape')
const nlp = require('./_lib')

test('sentences.toPositive', function(t) {
  let doc = nlp(`okay, do not use reverse psychology.`)
  doc
    .sentences()
    .toPositive()
    .toPositive()
    .toPositive()
    .toPositive()
  t.equal(doc.text(), 'okay, use reverse psychology.')

  // doc.sentences().toNegative()
  // t.equal(doc.text(), 'okay, do not use reverse psychology.')

  t.end()
})
