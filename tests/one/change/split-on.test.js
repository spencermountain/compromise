import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/splitOn] '

test('one split, one sentence', function (t) {
  const doc = nlp('before before match, after after.')
  const m = doc.splitOn('@hasComma')
  t.equal(m.length, 3, here + 'found 3')
  t.equal(m.eq(0).out('normal'), 'before before', here + 'found before')
  t.equal(m.eq(1).out('normal'), 'match', here + 'found match')
  t.equal(m.eq(2).out('normal'), 'after after', here + 'found after')
  t.end()
})

test('multi split, one sentence', function (t) {
  const doc = nlp('before before match, then a match, after after.')
  const m = doc.splitOn('@hasComma')
  t.equal(m.length, 5, here + 'found 5')
  t.equal(m.eq(0).out('normal'), 'before before', here + 'found before')
  t.equal(m.eq(1).out('normal'), 'match', here + 'found match')
  t.equal(m.eq(2).out('normal'), 'then a', here + 'found between')
  t.equal(m.eq(3).out('normal'), 'match', here + 'found match2')
  t.equal(m.eq(4).out('normal'), 'after after', here + 'found after')
  t.end()
})

test('one split, multi sentence', function (t) {
  const doc = nlp('before before match, after after. then over here')
  const m = doc.splitOn('match')
  t.equal(m.length, 4, here + 'found 4')
  t.equal(m.eq(0).out('normal'), 'before before', here + 'found before')
  t.equal(m.eq(1).out('normal'), 'match', here + 'found match')
  t.equal(m.eq(2).out('normal'), 'after after', here + 'found after')
  t.equal(m.eq(3).out('normal'), 'then over here', here + 'next sentence')
  t.end()
})

test('multi split, multi sentence', function (t) {
  const doc = nlp('before before match1, match2 after after. then a match3 over here')
  const m = doc.splitOn('/^match/')
  t.equal(m.length, 7, here + 'found 7')
  t.equal(m.eq(0).out('normal'), 'before before', here + 'found before')
  t.equal(m.eq(1).out('normal'), 'match1', here + 'found match1')
  t.equal(m.eq(2).out('normal'), 'match2', here + 'found match2')
  t.equal(m.eq(3).out('normal'), 'after after', here + 'found after')
  t.equal(m.eq(4).out('normal'), 'then a', here + 'next sentence')
  t.equal(m.eq(5).out('normal'), 'match3', here + 'next sentence match')
  t.equal(m.eq(6).out('normal'), 'over here', here + 'next sentence after')
  t.end()
})

test('greedy split', function (t) {
  const doc = nlp('match match middle middle match. then over here')
  const m = doc.splitOn('match+')
  t.equal(m.length, 4, here + 'found 4')
  t.equal(m.eq(0).out('normal'), 'match match', here + 'found two')
  t.equal(m.eq(1).out('normal'), 'middle middle', here + 'found middles')
  t.equal(m.eq(2).out('normal'), 'match', here + 'found one')
  t.equal(m.eq(3).out('normal'), 'then over here', here + 'next sentence')
  t.end()
})

test('split skip sentence', function (t) {
  const doc = nlp('before match. nothing found here. two match after')
  const m = doc.splitOn('match')
  t.equal(m.length, 6, here + 'found 6')
  t.equal(m.eq(0).out('normal'), 'before', here + 'found before')
  t.equal(m.eq(1).out('normal'), 'match', here + 'found match')
  t.equal(m.eq(2).out('normal'), 'nothing found here.', here + 'no-match sentence')
  t.equal(m.eq(3).out('normal'), 'two', here + 'found before2')
  t.equal(m.eq(4).out('normal'), 'match', here + 'found match2')
  t.equal(m.eq(5).out('normal'), 'after', here + 'found after')
  t.end()
})

test('no match split', function (t) {
  const doc = nlp('nothing found here. none here either')
  const m = doc.splitOn('match')
  t.equal(m.length, 2, here + 'found 2')
  t.equal(m.eq(0).text(), 'nothing found here.', here + 'not found 1')
  t.equal(m.eq(1).text(), 'none here either', here + 'not found 2')
  t.end()
})

test('splitOn multi', function (t) {
  let doc = nlp('one yeah')
  let m = doc.match('(one|two) yeah')
  let res = m.splitAfter(doc.match('(one|two)'))
  t.deepEqual(res.out('array'), ['one', 'yeah'], here + 'split-single')

  doc = nlp('one yeah two yeah')
  m = doc.match('(one|two) yeah')
  res = m.splitAfter(doc.match('(one|two)'))
  t.deepEqual(res.out('array'), ['one', 'yeah', 'two', 'yeah'], here + 'split-multi')
  t.end()
})

test('tricky-splitafter', function (t) {
  const str = `one two three`
  let m = nlp(str).match('.')

  m = m.splitAfter('foo')
  t.equal(m.text(), str, here + 'no-split')

  m = m.splitAfter('one')
  t.equal(m.text(), str, here + 'top-split')

  m = m.splitAfter('two')
  t.equal(m.text(), str, here + 'mid-split')

  m = m.splitAfter('three')
  t.equal(m.text(), str, here + 'post-split')

  t.end()
})

// test('split-parent', function (t) {
//   let doc = nlp('if so, he is the best, that i see. he is the greatest in the world')
//   t.equal(doc.length, 2, 'init parent is 2 sentence')

//   let m = doc.match('he is').splitOn()
//   t.equal(m.length, 5, 'splitOn parent into 5')

//   m = doc.match('he is').splitAfter()
//   t.equal(m.length, 4, 'splitAfter parent into 4')

//   m = doc.match('he is').splitBefore()
//   t.equal(m.length, 3, 'splitBefore parent into 3')

//   t.equal(doc.length, 2, 'parent is still 2 sentence')

//   t.end()
// })
