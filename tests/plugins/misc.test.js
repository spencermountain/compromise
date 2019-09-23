var test = require('tape')
var nlp = require('../_lib')

test('verbs.adverbs', function(t) {
  var doc = nlp('spencer is really great! Spencer really, really was superb.')
  doc
    .verbs()
    .adverbs()
    .remove()
  t.equal(doc.out(), 'spencer is great! Spencer was superb.', 'no-adverbs')
  t.end()
})

test('sentence prepend', function(t) {
  var doc = nlp('He is cool.')
  doc.sentences().prepend('so i think')
  t.equal(doc.text(), 'So i think he is cool.', 'reset titlecase')

  doc = nlp('Spencer is cool.')
  doc.sentences().prepend('yeah')
  t.equal(doc.text(), 'Yeah Spencer is cool.', 'leave propernoun titlecase')
  t.end()
})

test('sentence filters', function(t) {
  var doc = nlp('He is cool? I think not. Yipeee!').sentences()

  t.equal(doc.isExclamation().length, 1, 'has-exclamation')
  t.equal(doc.isQuestion().length, 1, 'has-question')
  t.equal(doc.isStatement().length, 1, 'has-statement')

  t.end()
})

test('sentence append', function(t) {
  let doc = nlp('Spencer is cool.')
  doc.sentences().append('i think')
  t.equal(doc.text(), 'Spencer is cool i think.', 'move period')

  doc = nlp('Spencer is cool?')
  doc.sentences().append('i think')
  t.equal(doc.text(), 'Spencer is cool i think?', 'move question-mark')

  doc = nlp('Spencer is cool!')
  doc.sentences().append('i think')
  t.equal(doc.text(), 'Spencer is cool i think!', 'move exclamation-mark')
  t.end()
})

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
  let arr = doc.endgrams({ size: 2 })
  t.equal(arr.length, 2, 'found 2 endgrams of size-2')
  t.equal(arr[0].normal, 'good person', 'found good person')
  t.equal(arr[0].count, 2, 'found 2 good person results')
  t.end()
})

test('misc nouns', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.nouns().length, 0, 'found no nouns')

  doc = nlp(`john smith, and then Google Inc in Flordia`)
  t.equal(doc.nouns().length, 3, 'found three nouns')
  t.end()
})

test('misc values', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.values().length, 0, 'found no values')

  doc = nlp(`seven is slightly before eleven, but after two.`)
  t.equal(doc.values().length, 3, 'found three values')
  t.end()
})

test('misc sentences', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.sentences().length, 1, 'found one sentence')

  doc = nlp(`john, bill, and joe. Here we go. Must be three now.`)
  t.equal(doc.sentences().length, 3, 'found three sentences')
  t.end()
})
