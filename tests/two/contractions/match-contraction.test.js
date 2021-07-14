import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/match-contraction] '

test('match-contractions', function (t) {
  let doc = nlp(`i haven't done it`)
  let m = doc.match(`have not done`)
  t.equal(m.text(), `haven't done`, 'full-text')

  m = doc.match(`have not`)
  t.equal(m.text(), `haven't`, 'first-half-found')

  m = doc.match(`not done`)
  t.equal(m.text(), `done`, 'second-half-found')

  m = doc.match(`haven't`)
  t.equal(m.text(), `haven't`, 'match-contraction')

  m = doc.match(`haven't done`)
  t.equal(m.text(), `haven't done`, 'match-contraction-full')

  m = doc.match(`have done`)
  t.equal(m.text(), ``, 'only-outsides')

  t.end()
})

test('false-positive-contractions', function (t) {
  let doc = nlp(`i have done it`)
  let m = doc.match(`have not done`)
  t.equal(m.text(), ``, 'have not done')

  m = doc.match(`have not`)
  t.equal(m.text(), ``, 'have not')

  m = doc.match(`not`)
  t.equal(m.text(), ``, 'not')

  m = doc.match(`not done`)
  t.equal(m.text(), ``, 'not done')

  m = doc.match(`haven't`)
  t.equal(m.text(), ``, `haven't`)

  m = doc.match(`haven't done`)
  t.equal(m.text(), ``, `haven't done`)

  m = doc.match(`have not done`)
  t.equal(m.text(), ``, `have not done`)

  m = doc.match(`have done`)
  t.equal(m.text(), `have done`, `have done`)
  t.end()
})

test('i am contraction', function (t) {
  let doc = nlp(`so i'm glad`)
  let m = doc.match(`i am`)
  t.equal(m.text(), `i'm`, 'i am')

  m = doc.match(`i`)
  t.equal(m.text(), `i'm`, `i`)

  m = doc.match(`am`)
  t.equal(m.text(), ``, `am`)

  m = doc.match(`i am glad`)
  t.equal(m.text(), `i'm glad`, `i'm glad`)

  m = doc.match(`i glad`)
  t.equal(m.text(), ``, 'i glad')
  t.end()
})

test('contraction-optional', function (t) {
  let doc = nlp(`so i'm glad`)
  let m = doc.match(`i am?`)
  t.equal(m.text(), `i'm`, 'i am?')

  m = doc.match(`i am?`)
  t.equal(m.text(), `i'm`, `i am?`)

  m = doc.match(`am glad?`)
  t.equal(m.text(), `glad`, `am glad?`)

  m = doc.match(`i am? glad`)
  t.equal(m.text(), `i'm glad`, `i am? glad`)

  m = doc.match(`i glad?`)
  t.equal(m.text(), `i'm`, 'i glad?')
  t.end()
})
