const test = require('tape')
const nlp = require('../_lib')

test('one split, one sentence', function (t) {
  let doc = nlp('before before match, after after.')
  let m = doc.splitOn('@hasComma')
  t.equal(m.length, 3, 'found 3')
  t.equal(m.get(0).out('normal'), 'before before', 'found before')
  t.equal(m.get(1).out('normal'), 'match', 'found match')
  t.equal(m.get(2).out('normal'), 'after after', 'found after')
  t.end()
})

test('multi split, one sentence', function (t) {
  let doc = nlp('before before match, then a match, after after.')
  let m = doc.splitOn('@hasComma')
  t.equal(m.length, 5, 'found 5')
  t.equal(m.get(0).out('normal'), 'before before', 'found before')
  t.equal(m.get(1).out('normal'), 'match', 'found match')
  t.equal(m.get(2).out('normal'), 'then a', 'found between')
  t.equal(m.get(3).out('normal'), 'match', 'found match2')
  t.equal(m.get(4).out('normal'), 'after after', 'found after')
  t.end()
})

test('one split, multi sentence', function (t) {
  let doc = nlp('before before match, after after. then over here')
  let m = doc.splitOn('match')
  t.equal(m.length, 4, 'found 4')
  t.equal(m.get(0).out('normal'), 'before before', 'found before')
  t.equal(m.get(1).out('normal'), 'match', 'found match')
  t.equal(m.get(2).out('normal'), 'after after', 'found after')
  t.equal(m.get(3).out('normal'), 'then over here', 'next sentence')
  t.end()
})

test('multi split, multi sentence', function (t) {
  let doc = nlp('before before match1, match2 after after. then a match3 over here')
  let m = doc.splitOn('/^match/')
  t.equal(m.length, 7, 'found 7')
  t.equal(m.get(0).out('normal'), 'before before', 'found before')
  t.equal(m.get(1).out('normal'), 'match1', 'found match1')
  t.equal(m.get(2).out('normal'), 'match2', 'found match2')
  t.equal(m.get(3).out('normal'), 'after after', 'found after')
  t.equal(m.get(4).out('normal'), 'then a', 'next sentence')
  t.equal(m.get(5).out('normal'), 'match3', 'next sentence match')
  t.equal(m.get(6).out('normal'), 'over here', 'next sentence after')
  t.end()
})

test('greedy split', function (t) {
  let doc = nlp('match match middle middle match. then over here')
  let m = doc.splitOn('match+')
  t.equal(m.length, 4, 'found 4')
  t.equal(m.get(0).out('normal'), 'match match', 'found two')
  t.equal(m.get(1).out('normal'), 'middle middle', 'found middles')
  t.equal(m.get(2).out('normal'), 'match', 'found one')
  t.equal(m.get(3).out('normal'), 'then over here', 'next sentence')
  t.end()
})

test('split skip sentence', function (t) {
  let doc = nlp('before match. nothing found here. two match after')
  let m = doc.splitOn('match')
  t.equal(m.length, 6, 'found 6')
  t.equal(m.get(0).out('normal'), 'before', 'found before')
  t.equal(m.get(1).out('normal'), 'match', 'found match')
  t.equal(m.get(2).out('normal'), 'nothing found here.', 'no-match sentence')
  t.equal(m.get(3).out('normal'), 'two', 'found before2')
  t.equal(m.get(4).out('normal'), 'match', 'found match2')
  t.equal(m.get(5).out('normal'), 'after', 'found after')
  t.end()
})

test('no match split', function (t) {
  let doc = nlp('nothing found here. none here either')
  let m = doc.splitOn('match')
  t.equal(m.length, 2, 'found 2')
  t.equal(m.get(0).out('normal'), 'nothing found here.', 'not found 1')
  t.equal(m.get(1).out('normal'), 'none here either', 'not found 2')
  t.end()
})

test('split-parent', function (t) {
  let doc = nlp('if so, he is the best, that i see. he is the greatest in the world')
  t.equal(doc.length, 2, 'init parent is 2 sentence')

  let m = doc.match('he is').splitOn()
  t.equal(m.length, 5, 'splitOn parent into 5')

  m = doc.match('he is').splitAfter()
  t.equal(m.length, 4, 'splitAfter parent into 4')

  m = doc.match('he is').splitBefore()
  t.equal(m.length, 3, 'splitBefore parent into 3')

  t.equal(doc.length, 2, 'parent is still 2 sentence')

  t.end()
})
