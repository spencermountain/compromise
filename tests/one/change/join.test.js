import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/join] '

test('sanity-check join:', function (t) {
  let doc = nlp(`John smith and John Franklin`)
  let m = doc.split('.')

  let res = m.joinIf('john', '.')
  t.deepEqual(res.out('array'), ['John smith', 'and', 'John Franklin'], here + 'john+.')
  t.equal(m.length, 5, here + 'parent unchanged')

  res = m.joinIf('@isTitleCase', '(smith|franklin|dolby)')
  t.deepEqual(res.out('array'), ['John smith', 'and', 'John Franklin'], here + 'title+name')

  t.end()
})

test('ensure same-sentence-only join:', function (t) {
  let doc = nlp(`john jacob and john. foobar`)
  let m = doc.split('.')

  let res = m.joinIf('john', '.')
  t.deepEqual(res.out('array'), ['john jacob', 'and', 'john.', 'foobar'], here + 'sentence')
  t.equal(m.length, 5, here + 'og split')

  t.end()
})

test('ensure neighbours-only join:', function (t) {
  let doc = nlp(`john and jacob but john jacob`)
  let m = doc.split('.')
  let res = m.joinIf('john', 'jacob')
  t.deepEqual(res.out('array'), ['john', 'and', 'jacob', 'but', 'john jacob'], here + 'neighbour')

  m = m.not('(and|but)')
  t.equal(m.length, 4, here + 'not-split')
  let res2 = m.joinIf('john', 'jacob')
  t.deepEqual(res2.out('array'), ['john', 'jacob', 'john jacob'], here + 'neighbour2')

  t.end()
})
