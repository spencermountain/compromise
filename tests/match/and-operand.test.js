const test = require('tape')
const nlp = require('../_lib')

test('and-match', function (t) {
  let doc = nlp('june and july cool')
  let m = doc.match('(#Date && july)')
  t.equal(m.out(), 'july', 'found july')

  m = doc.match('(#Date && !july)')
  t.equal(m.out(), 'june', 'found not july')

  m = doc.match('(and && !foo && #Conjunction && .)')
  t.equal(m.out(), 'and', 'three-match')

  t.end()
})

test('and-match-more', function (t) {
  let doc = nlp('toronto and montreal. Sydney and Paris.')
  let m = doc.match('(#Place && .)')
  t.equal(m.length, 4, 'found all four')

  m = doc.match('(#Place && /e/)')
  t.equal(m.out(), 'montreal. Sydney', 'found e words')

  m = doc.match('(#Place && !#Verb)')
  t.equal(m.length, 4, 'and not')

  m = doc.match('(#Place && #Verb)')
  t.equal(m.length, 0, 'no and')

  m = doc.match('(#Place && #Noun && * && .{1,3})')
  t.equal(m.length, 4, 'four towns')

  t.end()
})

// test('and-match-multi', function(t) {
//   let doc = nlp('toronto and montreal. Sydney and Paris.')
//   let m = doc.match('(#Place and && toronto .)')
//   t.equal(m.out(), 'toronto and', 'found one multi')
//   t.end()
// })
