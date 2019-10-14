const test = require('tape')
const nlp = require('./_lib')

test('soft-match', function(t) {
  let doc = nlp(`a priest walked into the bars`)
  doc.cache({ root: true })
  t.equal(doc.match('bars').found, true, 'found bars')
  t.equal(doc.match('bar').found, false, 'missed bar without ~')
  t.equal(doc.match('~bars~').found, true, 'found ~ bars')
  t.equal(doc.match('~bar~').found, true, 'found ~ bar')
  t.end()
})
