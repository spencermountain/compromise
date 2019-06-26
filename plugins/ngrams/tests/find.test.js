var test = require('tape')
var nlp = require('./_lib')

test('misc', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.ngrams().length, 0, 'found no ngrams')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.unigrams().length, 3, 'found three unigrams')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.bigrams().length, 2, 'found 2 bigrams')

  doc = nlp(`john, bill, joe`)
  t.equal(doc.trigrams().length, 1, 'found 1 trigrams')
  t.end()
})
