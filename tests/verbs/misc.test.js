const test = require('tape')
const nlp = require('../_lib')

test('verbs.adverbs', function(t) {
  const doc = nlp('spencer is really great! Spencer really really was superb.')
  doc
    .verbs()
    .adverbs()
    .delete()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', 'no-adverbs')
  t.end()
})
