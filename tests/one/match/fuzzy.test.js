import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/fuzzy] '

test('fuzzy matches', function (t) {
  const doc = nlp('i went on a talk')
  let m = doc.match('. ~walk~', null, { fuzzy: 0.7 })
  t.equal(m.text(), 'a talk', here + 'fuzzy-simple')

  m = doc.match('. ~walk~', null, { fuzzy: 0.9 })
  t.equal(m.text(), '', here + 'fuzzy-harsh')

  m = doc.match('a ~(football|walk|climb)~', null, { fuzzy: 0.74 })
  t.equal(m.text(), 'a talk', here + 'fuzzy-options')

  m = doc.match('a (football|~walk~|climb)', null, { fuzzy: 0.74 })
  t.equal(m.text(), 'a talk', here + 'fuzzy-inside-options')

  m = doc.match('i ~dent~ on a ~walk~', null, { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', here + 'fuzzy-double')

  m = doc.match('i ~ent~ on a ~alk~', null, { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', here + 'fuzzy-deletion')

  m = doc.match('i ~swent~ on a ~stalk~', null, { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', here + 'fuzzy-insertion')

  m = doc.match('i ~ewnt~ on a ~atlk~', null, { fuzzy: 0.74 })
  t.equal(m.text(), 'i went on a talk', here + 'fuzzy-swap')

  m = doc.match('', null, { fuzzy: 0.9 })
  t.equal(m.text(), '', here + 'fuzzy-empty')

  m = doc.match('i ~ewnt~ on a [~atlk~]', 0, { fuzzy: 0.73 })
  t.equal(m.text(), 'talk', here + 'fuzzy-group')

  const reg = nlp.parseMatch('a (~football~|~walk~|climb)', { fuzzy: 0.7 })
  m = nlp('a foobtall').match(reg)
  t.equal(m.text(), 'a foobtall', here + 'fuzzy-parsematch')

  t.end()
})

test('fuzzy groupmatches', function (t) {
  const doc = nlp('i went on a talk')

  let m = doc.match('i ~ewnt~ on a [~atlk~]', 0, { fuzzy: 0.74 })
  t.equal(m.text(), 'talk', here + 'fuzzy-group-1')

  m = doc.match('i ~ewnt~ on a [<word>~atlk~]', 'word', { fuzzy: 0.74 })
  t.equal(m.text(), 'talk', here + 'fuzzy-group-2')

  const reg = nlp.parseMatch('a [~(football|walk|climb)~]', { fuzzy: 0.7 })
  m = nlp('a foobtall').match(reg, 0)
  t.equal(m.text(), 'foobtall', here + 'fuzzy-named-group')
  t.end()
})

test('edit-distance by string length', function (t) {
  let doc = nlp('foo bar aa')
  let m = doc.match('~ab~', null, { fuzzy: 0.4 })
  t.equal(m.text(), '', here + '2-letters ignored')

  doc = nlp('foo bar aaa')
  m = doc.match('~aba~', null, { fuzzy: 0.4 })
  t.equal(m.text(), 'aaa', here + '3-letters okay')

  doc = nlp('foo boo aaaa')
  m = doc.match('~abaa~', null, { fuzzy: 0.7 })
  t.equal(m.text(), 'aaaa', here + '4-letters in')
  m = doc.match('~abaa~', null, { fuzzy: 0.76 })
  t.equal(m.text(), '', here + '4-letters out')

  doc = nlp('foo boo aaaaa')
  m = doc.match('~abaaa~', null, { fuzzy: 0.75 })
  t.equal(m.text(), 'aaaaa', here + '5-letters in')
  m = doc.match('~abaaa~', null, { fuzzy: 0.85 })
  t.equal(m.text(), '', here + '5-letters out')

  doc = nlp('foo boo aaaaaa')
  m = doc.match('~abaaaa~', null, { fuzzy: 0.8 })
  t.equal(m.text(), 'aaaaaa', here + '6-letters in')
  m = doc.match('~abaaaa~', null, { fuzzy: 0.85 })
  t.equal(m.text(), '', here + '6-letters out')

  doc = nlp('foo boo aaaaaaa')
  m = doc.match('~abaaaaa~', null, { fuzzy: 0.85 })
  t.equal(m.text(), 'aaaaaaa', here + '7-letters in')
  m = doc.match('~abaaaaa~', null, { fuzzy: 0.9 })
  t.equal(m.text(), '', here + '7-letters out')

  doc = nlp('foo boo aaaaaaaa')
  m = doc.match('~abaaaaaa~', null, { fuzzy: 0.87 })
  t.equal(m.text(), 'aaaaaaaa', here + '8-letters in')
  m = doc.match('~abaaaaaa~', null, { fuzzy: 0.9 })
  t.equal(m.text(), '', here + '8-letters out')

  t.end()
})
