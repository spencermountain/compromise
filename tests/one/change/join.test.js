import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/join] '

test('sanity-check join:', function (t) {
  const doc = nlp(`John smith and John Franklin`)
  const m = doc.split('.')

  let res = m.joinIf('john', '.')
  t.deepEqual(res.out('array'), ['John smith', 'and', 'John Franklin'], here + 'john+.')
  t.equal(m.length, 5, here + 'parent unchanged')

  res = m.joinIf('@isTitleCase', '(smith|franklin|dolby)')
  t.deepEqual(res.out('array'), ['John smith', 'and', 'John Franklin'], here + 'title+name')

  t.end()
})

test('ensure same-sentence-only join:', function (t) {
  const doc = nlp(`john jacob and john. foobar`)
  const m = doc.split('.')

  const res = m.joinIf('john', '.')
  t.deepEqual(res.out('array'), ['john jacob', 'and', 'john.', 'foobar'], here + 'sentence')
  t.equal(m.length, 5, here + 'og split')

  t.end()
})

test('ensure neighbours-only join:', function (t) {
  const doc = nlp(`john and jacob but john jacob`)
  let m = doc.split('.')
  const res = m.joinIf('john', 'jacob')
  t.deepEqual(res.out('array'), ['john', 'and', 'jacob', 'but', 'john jacob'], here + 'neighbour')

  m = m.not('(and|but)')
  t.equal(m.length, 4, here + 'not-split')
  const res2 = m.joinIf('john', 'jacob')
  t.deepEqual(res2.out('array'), ['john', 'jacob', 'john jacob'], here + 'neighbour2')

  t.end()
})

test('join-all:', function (t) {
  const str = `john jacob and john. john cool foo`
  const doc = nlp(str)
  t.equal(doc.length, 2, here + 'og split')
  const m = doc.splitAfter('john .')
  t.deepEqual(m.out('array'), ['john jacob', 'and john.', 'john cool', 'foo'], here + 'full join')

  const res = m.join()
  t.equal(res.length, 2, here + 'two again')
  t.equal(res.text(), str, here + 'full again')

  t.end()
})

test('join-all-miss:', function (t) {
  const doc = nlp(`before but after. before after`)
  let m = doc.split()
  m = m.not('but')
  const res = m.join()
  t.deepEqual(res.out('array'), ['before', 'after.', 'before after'], here + 'full join')

  t.end()
})

test('join-lazy:', function (t) {
  const doc = nlp('one foo two foo')
  let m = doc.terms()
  m = m.join()
  t.deepEqual(m.out('array'), ['one foo two foo'], here + 'lazy join')
  t.end()
})
