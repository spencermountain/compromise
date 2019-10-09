var test = require('tape')
var nlp = require('./_lib')

test('misc sentences', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.sentences().length, 1, 'found one sentence')

  doc = nlp(`john, bill, and joe. Here we go. Must be three now.`)
  t.equal(doc.sentences().length, 3, 'found three sentences')
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
