import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/integration/regression/oct-fixes] '

test('gerunds after a heading colon', t => {
  for (const word of ['creating', 'Creating', 'Building', 'Writing']) {
    const doc = nlp(`Tutorial: ${word} a cake`)
    t.equal(doc.match('#Gerund').text(), word, word)
  }
  t.equal(nlp('Destination: Reading').has('#Gerund'), false, here + 'keep place names')
  t.end()
})

test('resume-style developed clauses', t => {
  for (const text of [
    'Developed backend for real-time AI communication',
    'Developed scalable React architecture',
    'Developed React architecture',
  ]) {
    t.deepEqual(nlp(text).verbs().out('array'), ['Developed'], text)
  }
  t.equal(nlp('The backend is ready').match('backend').has('#Noun'), true, 'backend noun')
  t.equal(
    nlp('Developed countries have strong economies').match('Developed').has('#Adjective'),
    true,
    'adjectival developed'
  )
  t.equal(nlp('A developed economy is stable').match('developed').has('#Adjective'), true, 'attributive developed')
  t.end()
})

test('adjective root transformation', t => {
  for (const [input, expected] of [
    ['it was the snowiest day ever', 'it was the snowy day ever'],
    ['it was snowier than yesterday', 'it was snowy than yesterday'],
    ['a better idea', 'a good idea'],
    ['the worst idea', 'the bad idea'],
    ['a snowy day', 'a snowy day'],
  ]) {
    const doc = nlp(input)
    doc.adjectives().toRoot()
    t.equal(doc.text(), expected, input)
    t.equal(doc.has('#Comparative'), false, here + 'remove comparative tag')
    t.equal(doc.has('#Superlative'), false, here + 'remove superlative tag')
  }
  const doc = nlp('a colder and snowier day')
  doc.adjectives().toRoot(1)
  t.equal(doc.text(), 'a colder and snowy day', 'select an adjective by index')
  t.equal(nlp('no adjectives here').adjectives().toRoot().found, false, here + 'empty selection')
  t.end()
})
