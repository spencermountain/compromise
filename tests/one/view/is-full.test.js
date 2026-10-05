import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/isFull] '

test('isFull :', function (t) {
  const doc = nlp('one two three. four five. six seven eight. nine')
  t.equal(doc.isFull(), true, here + 'full')

  let m = doc.match('four five')
  t.equal(m.isFull(), false, here + 'part')

  m = doc.terms()
  t.equal(m.isFull(), true, here + 'terms')

  m = doc.harden()
  t.equal(m.isFull(), true, here + 'harden')

  m = m.eq(2)
  t.equal(m.isFull(), false, here + 'eq')

  doc.remove('four')
  t.equal(doc.isFull(), true, here + 'remove')
  doc.remove('five')
  t.equal(doc.isFull(), true, here + 'remove2')

  m = doc.terms().all()
  t.equal(m.isFull(), true, here + 'all')
  t.end()
})

test('isFull-split', function (t) {
  const doc = nlp('one two foo three. four foo five')
  const a = doc.splitOn('foo')
  t.equal(a.isFull(), true, 'spliton')

  const b = doc.splitBefore('foo')
  t.equal(b.isFull(), true, 'splitbefore')

  const c = doc.splitAfter('foo')
  t.equal(c.isFull(), true, 'splitafter')
  t.end()
})
