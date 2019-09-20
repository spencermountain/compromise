var test = require('tape')
var nlp = require('./_lib')

// test('support-2-part-list', function(t) {
//   var doc = nlp('spencer is cool, and great. He is nice and tired.')
//   let m = doc.lists()
//   t.equal(m.length, 2, 'has two lists')
//   t.end()
// })

// test('muti-word things', function(t) {
//   var doc = nlp('spencer is nice, quite warm, and tired.')
//   let m = doc.lists()
//   t.equal(m.length, 1, 'has one list')
//   t.equal(m.things(), 3, 'has three things')
//   t.end()
// })

// test('add', function(t) {
//   var doc = nlp('spencer is nice, warm and tired.')
//   doc.lists().add('CRAAZY')
//   t.equal(doc.text(), 'spencer is nice, warm, CRAZY and tired.', 'without no-oxford')
//   t.end()
// })

test('hasOxfordComma', function(t) {
  var doc = nlp('spencer is cool, fun, and great. He is nice, tired and not smart.')
  let m = doc.lists().hasOxfordComma()
  t.equal(m.length, 1, 'only one has oxford-comma')
  t.equal(m.text(), 'cool, fun, and great', 'first-one has oxford-comma')
  t.end()
})
