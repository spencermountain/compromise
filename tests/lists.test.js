const test = require('tape')
const nlp = require('./_lib')

test('comma-remove', function (t) {
  let doc = nlp('i saw red, blue, and green.')
  doc.lists().removeOxfordComma()
  t.equal(doc.text(), 'i saw red, blue and green.', 'remove comma')

  doc = nlp('i saw red, blue, and green.')
  doc.lists().addOxfordComma()
  t.equal(doc.text(), 'i saw red, blue, and green.', 'add comma')

  doc.lists().addOxfordComma()
  doc.lists().addOxfordComma()
  doc.lists().addOxfordComma()
  t.equal(doc.text(), 'i saw red, blue, and green.', 'just one comma')
  doc.lists().removeOxfordComma()
  doc.lists().removeOxfordComma()
  doc.lists().removeOxfordComma()
  t.equal(doc.text(), 'i saw red, blue and green.', 'still no commas')
  t.end()
})

test('list-remove', function (t) {
  let doc = nlp('i saw red, blue and green.')
  doc.lists().remove('asdf')
  t.equal(doc.text(), 'i saw red, blue and green.', 'missing remove match')

  doc = nlp('i saw red, blue and green.')
  doc.lists().remove('blue')
  t.equal(doc.text(), 'i saw red, and green.', 'remove list item')
  t.end()
})

test('list-parse', function (t) {
  let arr = nlp('i saw red, blue, and silver').lists().items()
  t.equal(arr.length, 3, 'found three colors, oxfort-comma')

  arr = nlp('i saw red, blue and silver').lists().items()
  t.equal(arr.length, 3, 'found three colors, no-comma')

  arr = nlp('i saw the Eiffel Tower, the pyramids, and the Louvre').lists().items()
  t.equal(arr.length, 3, 'found three places, with article')

  arr = nlp('i saw Eiffel Tower, pyramids, and not Louvre').lists().items()
  t.equal(arr.length, 3, 'found three places, without article')

  t.end()
})

test('list-types', function (t) {
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

test('muti-word things', function (t) {
  const doc = nlp('spencer is nice, quite warm, and tired.')
  let m = doc.lists()
  t.equal(m.length, 1, 'has one list')
  t.equal(m.things().length, 3, 'has three things')
  t.end()
})

test('add', function (t) {
  const doc = nlp('spencer is nice, warm and tired.')
  doc.lists().add('CRAAZY')
  t.equal(doc.text(), 'spencer is nice, warm, CRAAZY and tired.', 'without no-oxford')
  t.end()
})

test('hasOxfordComma', function (t) {
  const doc = nlp('spencer is cool, fun, and great. He is nice, tired and not smart.')
  let m = doc.lists().hasOxfordComma()
  t.equal(m.length, 1, 'only one has oxford-comma')
  t.equal(m.text(), 'cool, fun, and great', 'first-one has oxford-comma')
  t.end()
})
