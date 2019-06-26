var test = require('tape')
var nlp = require('./_lib')

test('misc', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.sentences().length, 0, 'found no nouns')

  doc = nlp(`john, bill, and joe. Here we go. Must be three now.`)
  t.equal(doc.sentences().length, 3, 'found three sentences')
  t.end()
})
