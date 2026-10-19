import test from 'tape'
import nlp from '../../../../src/three.js'
import markdown from '../../src/markdown/plugin.js'
nlp.plugin(markdown)

test('markdown - fragmented replacement fails only at write-back', t => {
  const doc = nlp.fromMarkdown('She walk*ed* to school.')
  const original = doc.markdown()
  t.doesNotThrow(() => doc.match('walked').replaceWith('ran'), 'ordinary replacement succeeds')
  t.ok(doc.has('ran to'), 'edited document remains usable')
  t.throws(() => doc.updateTree(), /ambiguous|crosses/i, 'write-back reports ambiguous ownership')
  t.equal(doc.markdown(), original, 'tree is unchanged')
  t.end()
})

test('markdown - cross-node replacement fails without partial writes', t => {
  const doc = nlp.fromMarkdown('She **walked** to school.')
  const original = doc.markdown()
  doc.match('She').toUpperCase()
  doc.match('walked to').replaceWith('visited')
  t.throws(() => doc.updateTree(), /ambiguous|crosses/i, 'cross-node replacement is rejected')
  t.equal(doc.markdown(), original, 'even earlier unambiguous edits are not written')
  t.ok(doc.has('visited'), 'failed write-back preserves the edited compromise document')
  t.end()
})

test('markdown - fragmented case change fails at write-back', t => {
  const doc = nlp.fromMarkdown('She walk*ed* to school.')
  const original = doc.markdown()
  doc.match('walked').toUpperCase()
  t.throws(() => doc.updateTree(), /ambiguous|crosses/i, 'in-place edit across fragments is rejected')
  t.equal(doc.markdown(), original, 'tree is unchanged')
  t.end()
})
