var test = require('tape')
var nlp = require('./_lib')

test('verbs.adverbs', function(t) {
  var doc = nlp('spencer is really great! Spencer really, really was superb.')
  doc
    .verbs()
    .adverbs()
    .remove()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', 'no-adverbs')
  t.end()
})
