import test from 'tape'
import nlp from '../_lib.js'

test('fuzzy matches', function (t) {
  let doc = nlp('i went on a talk')
  let m = doc.match('. walk', { fuzzy: 0.7 })
  t.equal(m.text(), 'a talk', 'fuzzy-simple')

  m = doc.match('. walk', { fuzzy: 0.9 })
  t.equal(m.text(), '', 'fuzzy-harsh')

  m = doc.match('a (football|walk|climb)', { fuzzy: 0.74 })
  t.equal(m.text(), 'a talk', 'fuzzy-options')

  m = doc.match('i dent on a walk', { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', 'fuzzy-double')

  m = doc.match('i ent on a alk', { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', 'fuzzy-deletion')

  m = doc.match('i swent on a stalk', { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', 'fuzzy-insertion')

  m = doc.match('i ewnt on a atlk', { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', 'fuzzy-swap')

  m = doc.match('', { fuzzy: 0.9 })
  t.equal(m.text(), '', 'fuzzy-empty')

  m = doc.match('i ewnt on a [atlk]', { fuzzy: 0.74, group: 0 })
  t.equal(m.text(), 'talk', 'fuzzy-group')

  let reg = nlp.parseMatch('a (football|walk|climb)', { fuzzy: 0.7 })
  m = nlp('a foobtall').match(reg)
  t.equal(m.text(), 'a foobtall', 'fuzzy-parsematch')

  t.end()
})

test('fuzzy groupmatches', function (t) {
  let doc = nlp('i went on a talk')

  let m = doc.match('i ewnt on a [atlk]', { fuzzy: 0.74, group: 0 })
  t.equal(m.text(), 'talk', 'fuzzy-group')

  m = doc.match('i ewnt on a [<word>atlk]', { fuzzy: 0.74, group: 'word' })
  t.equal(m.text(), 'talk', 'fuzzy-group')

  let reg = nlp.parseMatch('a [(football|walk|climb)]', { fuzzy: 0.7 })
  m = nlp('a foobtall').match(reg, 0)
  t.equal(m.text(), 'foobtall', 'fuzzy-named-group')
  t.end()
})

test('edit-distance by string length', function (t) {
  let doc = nlp('foo bar aa')
  let m = doc.match('ab', { fuzzy: 0.4 })
  t.equal(m.text(), '', '2-letters ignored')

  doc = nlp('foo bar aaa')
  m = doc.match('aba', { fuzzy: 0.4 })
  t.equal(m.text(), 'aaa', '3-letters okay')

  doc = nlp('foo boo aaaa')
  m = doc.match('abaa', { fuzzy: 0.7 })
  t.equal(m.text(), 'aaaa', '4-letters in')
  m = doc.match('abaa', { fuzzy: 0.75 })
  t.equal(m.text(), '', '4-letters out')

  doc = nlp('foo boo aaaaa')
  m = doc.match('abaaa', { fuzzy: 0.75 })
  t.equal(m.text(), 'aaaaa', '5-letters in')
  m = doc.match('abaaa', { fuzzy: 0.8 })
  t.equal(m.text(), '', '5-letters out')

  doc = nlp('foo boo aaaaaa')
  m = doc.match('abaaaa', { fuzzy: 0.8 })
  t.equal(m.text(), 'aaaaaa', '6-letters in')
  m = doc.match('abaaaa', { fuzzy: 0.85 })
  t.equal(m.text(), '', '6-letters out')

  doc = nlp('foo boo aaaaaaa')
  m = doc.match('abaaaaa', { fuzzy: 0.85 })
  t.equal(m.text(), 'aaaaaaa', '7-letters in')
  m = doc.match('abaaaaa', { fuzzy: 0.9 })
  t.equal(m.text(), '', '7-letters out')

  doc = nlp('foo boo aaaaaaaa')
  m = doc.match('abaaaaaa', { fuzzy: 0.87 })
  t.equal(m.text(), 'aaaaaaaa', '8-letters in')
  m = doc.match('abaaaaaa', { fuzzy: 0.9 })
  t.equal(m.text(), '', '8-letters out')

  t.end()
})
