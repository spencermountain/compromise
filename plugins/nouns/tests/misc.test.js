var test = require('tape')
var nlp = require('./_lib')

test('misc nouns', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.nouns().length, 0, 'found no nouns')

  doc = nlp(`john smith, and then Google Inc in Flordia`)
  t.equal(doc.nouns().length, 3, 'found three nouns')
  t.end()
})
