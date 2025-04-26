import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match-contraction] '

test('match-contractions', function (t) {
  const doc = nlp(`i haven't done it`)
  let m = doc.match(`have not done`)
  t.equal(m.text(), `haven't done`, here + 'full-text')

  m = doc.match(`have not`)
  t.equal(m.text(), `haven't`, here + 'first-half-found')

  m = doc.match(`not done`)
  t.equal(m.text(), `done`, here + 'second-half-found')

  m = doc.match(`haven't`)
  t.equal(m.text(), `haven't`, here + 'match-contraction')

  m = doc.match(`haven't done`)
  t.equal(m.text(), `haven't done`, here + 'match-contraction-full')

  m = doc.match(`have done`)
  t.equal(m.text(), ``, here + 'only-outsides')

  t.end()
})

test('false-positive-contractions', function (t) {
  const doc = nlp(`i have done it`)
  let m = doc.match(`have not done`)
  t.equal(m.text(), ``, here + 'have not done')

  m = doc.match(`have not`)
  t.equal(m.text(), ``, here + 'have not')

  m = doc.match(`not`)
  t.equal(m.text(), ``, here + 'not')

  m = doc.match(`not done`)
  t.equal(m.text(), ``, here + 'not done')

  m = doc.match(`haven't`)
  t.equal(m.text(), ``, here + `haven't`)

  m = doc.match(`haven't done`)
  t.equal(m.text(), ``, here + `haven't done`)

  m = doc.match(`have not done`)
  t.equal(m.text(), ``, here + `have not done`)

  m = doc.match(`have done`)
  t.equal(m.text(), `have done`, here + `have done`)
  t.end()
})

test('i am contraction', function (t) {
  const doc = nlp(`so i'm glad`)
  let m = doc.match(`i am`)
  t.equal(m.text(), `i'm`, here + 'i am')

  m = doc.match(`i`)
  t.equal(m.text(), `i'm`, here + `i`)

  m = doc.match(`am`)
  t.equal(m.text(), ``, here + `am`)

  m = doc.match(`i am glad`)
  t.equal(m.text(), `i'm glad`, here + `i'm glad`)

  m = doc.match(`i glad`)
  t.equal(m.text(), ``, here + 'i glad')
  t.end()
})

test('contraction-optional', function (t) {
  const doc = nlp(`so i'm glad`)
  let m = doc.match(`i am?`)
  t.equal(m.text(), `i'm`, here + 'i am?')

  m = doc.match(`i am?`)
  t.equal(m.text(), `i'm`, here + `i am?`)

  m = doc.match(`am glad?`)
  t.equal(m.text(), `glad`, here + `am glad?`)

  m = doc.match(`i am? glad`)
  t.equal(m.text(), `i'm glad`, here + `i am? glad`)

  m = doc.match(`i glad?`)
  t.equal(m.text(), `i'm`, here + 'i glad?')
  t.end()
})



test('lookup contraction', function (t) {
  const arr = [
    'foobar',
    'marines',
    'afghanistan',
    'foo',
  ]
  const trie = nlp.buildTrie(arr)
  const res = nlp(`so we're adding 3201 Marines to our forces in Afghanistan.`).lookup(trie)
  t.equal(res.has('marines'), true, 'post-contraction found first one')
  t.equal(res.has('afghanistan'), true, 'post-contraction found second one')
  t.end()
})
