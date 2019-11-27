const test = require('tape')
const nlp = require('../_lib')

test('verbs.adverbs', function(t) {
  let doc = nlp('spencer is really great! Spencer really really was superb.')
  doc
    .verbs()
    .adverbs()
    .delete()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', 'no-adverbs')

  doc = nlp('spencer truly would really run quickly')
    .verbs()
    .adverbs()
  t.equal(doc.length, 3, 'found all three adverbs')
  t.equal(doc.text('reduced'), 'truly really quickly', 'found adverbs in order')
  t.end()
})
