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
