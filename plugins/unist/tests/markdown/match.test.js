import test from 'tape'
import nlp from '../../../../src/three.js'
import markdown from '../../src/markdown/plugin.js'
nlp.plugin(markdown)

test('markdown - match across inline nodes', t => {
  const doc = nlp.fromMarkdown('She **walked** to [school](https://school.org).')
  t.equal(doc.text(), 'She walked to school.', 'markup is excluded from linguistic text')
  t.ok(doc.has('walked to'), 'match crosses the end of emphasis')
  t.ok(doc.has('to school'), 'match crosses the start of a link')
  t.notOk(doc.has('https'), 'link destinations are excluded')
  t.end()
})

test('markdown - one word across inline nodes', t => {
  const doc = nlp.fromMarkdown('She walk*ed* to school.')
  t.ok(doc.has('walked to'), 'fragmented word matches with its neighbour')
  t.equal(doc.match('walked').wordCount(), 1, 'fragmented word is one term')
  t.end()
})

test('markdown - punctuation inside and outside emphasis', t => {
  const outside = nlp.fromMarkdown('foo _bar_!')
  const inside = nlp.fromMarkdown('foo _bar!_')
  t.equal(outside.text(), 'foo bar!', 'outside punctuation becomes linguistic text')
  t.equal(inside.text(), outside.text(), 'both inputs have identical linguistic text')
  t.ok(outside.has('foo bar'), 'outside punctuation permits matching')
  t.ok(inside.has('foo bar'), 'inside punctuation permits matching')
  t.end()
})
