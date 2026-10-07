import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/adjectives/to-root] '

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
