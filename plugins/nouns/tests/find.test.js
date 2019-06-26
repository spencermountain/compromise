var test = require('tape')
var nlp = require('./_lib')

test('misc', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.nouns().length, 0, 'found no nouns')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.nouns().length, 3, 'found three nouns')
  t.end()
})
