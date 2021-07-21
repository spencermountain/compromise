const test = require('tape')
const nlp = require('./_lib')

test('misc ngrams', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.ngrams().length, 3, 'found three ngrams')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.unigrams().length, 3, 'found three unigrams')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.bigrams().length, 2, 'found 2 bigrams')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.trigrams().length, 1, 'found 1 trigrams')

  doc = nlp('i am in houston texas. i am a good person. so i think he is a good person.')
  let arr = doc.endgrams({ size: 2 }) || []
  t.equal(arr.length, 2, 'found 2 endgrams of size-2')
  let first = arr[0] || {}
  t.equal(first.normal, 'good person', 'found good person')
  t.equal(first.count, 2, 'found 2 good person results')
  t.end()
})
