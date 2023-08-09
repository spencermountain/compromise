import test from 'tape'
import nlp from './_lib.js'
const here = '[three/text] '
import penn from '../two/tagger/_pennSample.js'

test('text-in-text-out', function (t) {
  let txt = penn.map(o => o.text).join(' ')
  let doc = nlp(txt)
  let methods = [
    'terms',
    'all',
    // 'clauses', // fixme
    // 'chunks',
  ]
  methods.forEach(fn => {
    t.equal(doc[fn]().text(), txt, here + fn)
  })

  t.equal(doc.match('*').text(), txt, here + 'match *')
  t.equal(doc.growRight('*').text(), txt, here + 'growRight *')

  t.equal(doc.splitOn('is').text(), txt, here + 'splitOn')
  t.equal(doc.splitBefore('no').text(), txt, here + 'splitBefore') //broken
  t.equal(doc.splitAfter('how').text(), txt, here + 'splitAfter')
  t.end()
})
