import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/and] '

test('and-match', function (t) {
  let doc = nlp('june and july cool')
  let m = doc.match('(#Date && july)')
  t.equal(m.out(), 'july', here + 'found july')

  m = doc.match('(#Date && !july)')
  t.equal(m.out(), 'june', here + 'found not july')

  m = doc.match('(and && !foo && #Conjunction && .)')
  t.equal(m.out(), 'and', here + 'three-match')

  t.end()
})

test('and-match-more', function (t) {
  let doc = nlp('toronto and montreal. Sydney and Paris.')
  let m = doc.match('(#Place && .)')
  t.equal(m.length, 4, here + 'found all four')

  m = doc.match('(#Place && /e/)')
  t.equal(m.out(), 'montreal. Sydney', here + 'found e words')

  m = doc.match('(#Place && !#Verb)')
  t.equal(m.length, 4, here + 'and not')

  m = doc.match('(#Place && #Verb)')
  t.equal(m.length, 0, here + 'no and')

  m = doc.match('(#Place && #Noun && * && .{1,3})')
  t.equal(m.length, 4, here + 'four towns')

  t.end()
})

test('and-match-multi', function (t) {
  let doc = nlp('toronto and montreal. Sydney and Paris.')
  let m = doc.match('(#Place and && toronto .)')
  t.equal(m.out(), 'toronto and', here + 'found one multi')

  m = doc.match('(#Place and && toronto)')
  t.equal(m.out(), 'toronto and', here + 'use longest match')

  m = doc.match('(#Place and montreal && toronto)')
  t.equal(m.out(), 'toronto and montreal.', here + 'use longest match 2')
  t.end()
})
