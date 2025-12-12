import test from 'tape'
import nlp from './_lib.js'
const here = '[three/text] '
import penn from '../two/tagger/_pennSample.js'
const txt = penn.map(o => o.text).join(' ')

test('text-in-text-out', function (t) {
  const doc = nlp(txt)
  const methods = [
    'terms',
    'all',
    'clauses',
    'chunks',
  ]
  methods.forEach(fn => {
    t.equal(doc[fn]().text(), txt, here + fn)
  })

  t.equal(doc.match('*').text(), txt, here + 'match *')
  t.equal(doc.growRight('*').text(), txt, here + 'growRight *')

  t.equal(doc.splitOn('is').text(), txt, here + 'splitOn')
  t.equal(doc.splitBefore('no').text(), txt, here + 'splitBefore')
  t.equal(doc.splitAfter('how').text(), txt, here + 'splitAfter')
  t.end()
})


test('wordcount-split', function (t) {
  const doc = nlp(txt)
  let m = doc.splitBefore('#Noun+')
  t.equal(m.wordCount(), doc.wordCount(), 'splitBefore-wordcount')
  m = doc.splitOn('#Noun+')
  t.equal(m.wordCount(), doc.wordCount(), 'splitOn-wordcount')
  m = doc.splitAfter('#Noun+')
  t.equal(m.terms().length, doc.terms().length, 'splitAfter-wordcount')
  t.end()
})
