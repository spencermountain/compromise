const test = require('tape')
const nlp = require('./_lib')

test('misc values', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.values().length, 0, 'found no values')

  doc = nlp(`seven is slightly before eleven, but after two.`)
  t.equal(doc.values().length, 3, 'found three values')
  t.end()
})
