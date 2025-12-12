import test from 'tape'
import nlp from './_lib.js'
const here = '[three/sweep-tag] '

test('cache-one:', function (t) {
  const matches = [{ match: '(he|she|they|#Noun) (has|have) (a|an)' }]
  const net = nlp.buildNet(matches)
  const doc = nlp(`you have a appointment`)
  t.equal(doc.has(net), true, here + 'Noun cache')
  t.end()
})

test('sweep-root:', function (t) {
  const matches = [{ match: '{appointment}' }]
  const net = nlp.buildNet(matches)
  const doc = nlp(`you have some appointments`)
  doc.compute('root')
  t.equal(doc.has(net), true, here + 'root cache')
  t.end()
})

test('sweep-freeze:', function (t) {
  const matches = [
    { match: 'juicy fruit', tag: 'Singular', freeze: true },
    { match: 'front steps', tag: 'Plural', freeze: true },
    { match: 'juicy', tag: 'Adjective' },
    { match: 'front', tag: 'Adjective' },
  ]
  const doc = nlp(`i ate juicy fruit on the front steps`)
  const net = nlp.buildNet(matches)
  doc.sweep(net)
  let m = doc.match('juicy fruit')
  t.equal(m.has('#Singular #Singular'), true, here + 'juicy fruit')
  t.equal(m.has('#Adjective'), false, here + 'juicy fruit frozen')

  m = doc.match('front steps')
  t.equal(m.has('#Plural #Plural'), true, here + 'front steps')
  t.equal(m.has('#Adjective'), false, here + 'front steps frozen')
  t.end()
})
