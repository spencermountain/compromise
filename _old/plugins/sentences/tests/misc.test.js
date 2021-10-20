const test = require('tape')
const nlp = require('./_lib')

test('misc sentences', function(t) {
  let doc = nlp(`quickly, suddenly`)
  t.equal(doc.sentences().length, 1, 'found one sentence')

  doc = nlp(`john, bill, and joe. Here we go. Must be three now.`)
  t.equal(doc.sentences().length, 3, 'found three sentences')

  let d = nlp(`i am good`)
  let s = d.sentences()
  s.replace('am', 'was')
  t.equal(d.text(), 'i was good', 'tricky map replace bug')

  t.end()
})

test('full sentence', function(t) {
  let doc = nlp(`john, bill, and joe. Here we go. Must be three now.`)
  let m = doc.match('we')
  t.equal(m.sentences().text(), 'Here we go.', 'found full sentence')
  t.end()
})

test('sentence prepend', function(t) {
  let doc = nlp('He is cool.')
  doc.sentences().prepend('so i think')
  t.equal(doc.text(), 'So i think he is cool.', 'reset titlecase')

  doc = nlp('Spencer is cool.')
  doc.sentences().prepend('yeah')
  t.equal(doc.text(), 'Yeah Spencer is cool.', 'leave propernoun titlecase')
  t.end()
})

test('sentence filters', function(t) {
  let doc = nlp('He is cool? I think not. Yipeee!').sentences()

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

test('sentence append - change', function(t) {
  let doc = nlp('i am cool. it is raining!')
  doc.sentences().append('right?')
  t.equal(doc.text(), 'i am cool right? it is raining right?', 'change ending')

  doc = nlp('it is cool? it is raining?')
  doc.sentences(0).append('for sure.  ')
  t.equal(doc.all().text(), 'it is cool for sure.   it is raining?', 'change ending 2')
  t.end()
})
