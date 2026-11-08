import test from 'tape'
import nlp from './_lib.js'

test('markdown - replace a word inside strong text', t => {
  const doc = nlp.fromMarkdown('She **walked** to [school](https://school.org).')
  doc.match('walked').replaceWith('ran')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She **ran** to [school](https://school.org).', 'keeps emphasis and link destination')
  t.end()
})

test('markdown - replacement grows to multiple terms', t => {
  const doc = nlp.fromMarkdown('She **walked** to school.')
  doc.match('walked').replaceWith('had walked')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She **had walked** to school.', 'all replacement terms inherit emphasis')
  t.end()
})

test('markdown - repeated words retain separate owners', t => {
  const doc = nlp.fromMarkdown('She **walked** and **walked**.')
  doc.match('walked').replaceWith('had walked')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She **had walked** and **had walked**.', 'each replacement stays in its own node')
  t.end()
})

test('markdown - tense conversion and subsequent edits', t => {
  const doc = nlp.fromMarkdown('She **walked** to school.')
  doc.verbs().toPresentTense()
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She **walks** to school.', 'tense conversion transfers ownership')
  doc.match('walks').replaceWith('ran')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She **ran** to school.', 'a second edit updates the same tree')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She **ran** to school.', 'repeated write-back is idempotent')
  t.end()
})

test('markdown - preserve punctuation ownership during case changes', t => {
  const outside = nlp.fromMarkdown('foo *bar*!')
  const inside = nlp.fromMarkdown('foo *bar!*')
  outside.match('bar').toUpperCase()
  inside.match('bar').toUpperCase()
  outside.updateTree()
  inside.updateTree()
  t.equal(outside.markdown().trim(), 'foo *BAR*!', 'punctuation stays outside emphasis')
  t.equal(inside.markdown().trim(), 'foo *BAR!*', 'punctuation stays inside emphasis')
  t.end()
})

test('markdown - unchanged fragmented word can be written back', t => {
  const doc = nlp.fromMarkdown('She walk*ed* to school.')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'She walk*ed* to school.', 'original fragments remain intact')
  t.end()
})
