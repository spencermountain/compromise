import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/or] '

test('or-match-basic', function (t) {
  const doc = nlp('toronto and montreal. London and Paris')
  let m = doc.match('(#Place  | and )')
  t.equal(m.out(), 'toronto and montreal. London and Paris', here + 'whitespace-or')

  m = doc.match('(#Place  | nonono no no| and )')
  t.equal(m.out(), 'toronto and montreal. London and Paris', here + 'whitespace-or-multi1')

  m = doc.match('( nonono no no|| . )')
  t.equal(m.out(), 'toronto and montreal. London and Paris', here + 'whitespace-or-dot')
  t.end()
})

// test('or-match-multi', function(t) {
//   let doc = nlp('toronto and montreal. Sydney and Paris')
//   let m = doc.match('(#Place  and montreal )')
//   t.equal(m.out(), 'toronto and montreal', 'whitespace-or')
//   t.end()
// })

test('or-block skip counter', function (t) {
  // a failed greedy choice must not shift where the other choices are tried
  let doc = nlp('a a d').match('(a+ c|a a d)')
  t.equal(doc.out(), 'a a d', here + 'no-skip-pollution')

  // a failed or-block should never match anything
  doc = nlp('a a d').match('(a+ c)')
  t.equal(doc.out(), '', here + 'no-partial-match')

  // anchors on a greedy choice apply to its first term only
  doc = nlp('a a b').match('(^a+ b|nope)')
  t.equal(doc.out(), 'a a b', here + 'anchored-greedy-choice')

  t.end()
})
