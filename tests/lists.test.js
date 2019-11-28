const test = require('tape')
const nlp = require('./_lib')

test('list-types', function(t) {
  let doc = nlp('he is nice, cool, and really fun.').lists()
  t.equal(doc.length, 1, 'found adj list')
  t.equal(doc.things().length, 3, 'three adjs')

  doc = nlp('his sweat, blood, and tears').lists()
  t.equal(doc.length, 1, 'found noun list')
  t.equal(doc.things().length, 3, 'three nouns')

  doc = nlp('we ran, biked, swam, and then ate').lists()
  t.equal(doc.length, 1, 'found verb list')
  t.equal(doc.things().length, 4, 'four verbs')

  doc = nlp('there is Spencer Kelly, Donald Glover, and Justin Trudeau').lists()
  t.equal(doc.length, 1, 'found person list')
  t.equal(doc.things().length, 3, 'three people')

  t.end()
})

// test('support-2-part-list', function(t) {
//   const doc = nlp('spencer is cool, and great. He is nice and tired.')
//   let m = doc.lists()
//   t.equal(m.length, 2, 'has two lists')
//   t.end()
// })

test('muti-word things', function(t) {
  const doc = nlp('spencer is nice, quite warm, and tired.')
  let m = doc.lists()
  t.equal(m.length, 1, 'has one list')
  t.equal(m.things().length, 3, 'has three things')
  t.end()
})

test('add', function(t) {
  const doc = nlp('spencer is nice, warm and tired.')
  doc.lists().add('CRAAZY')
  t.equal(doc.text(), 'spencer is nice, warm, CRAAZY and tired.', 'without no-oxford')
  t.end()
})

test('hasOxfordComma', function(t) {
  const doc = nlp('spencer is cool, fun, and great. He is nice, tired and not smart.')
  let m = doc.lists().hasOxfordComma()
  t.equal(m.length, 1, 'only one has oxford-comma')
  t.equal(m.text(), 'cool, fun, and great', 'first-one has oxford-comma')
  t.end()
})
