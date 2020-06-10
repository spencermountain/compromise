const test = require('tape')
const nlp = require('../_lib')

test('verbs.json', function (t) {
  let json = nlp('She has called twice, not the tv').verbs().json()
  t.equal(json.length, 1, 'one verb')
  t.equal(json[0].isNegative, false, 'not negative')
  t.equal(json[0].parts.verb, 'called', 'got main verb')
  t.equal(json[0].parts.auxiliary, 'has', 'got aux verb')
  t.end()
})

test('verbs.adverbs', function (t) {
  let doc = nlp('spencer is really great! Spencer really really was superb.')
  doc.verbs().adverbs().delete()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', 'no-adverbs')

  doc = nlp('spencer truly would really run quickly').verbs().adverbs()
  t.equal(doc.length, 3, 'found all three adverbs')
  t.equal(doc.text('reduced'), 'truly really quickly', 'found adverbs in order')

  t.end()
})
