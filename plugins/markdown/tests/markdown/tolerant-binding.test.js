import test from 'tape'
import nlp from '../../../../src/three.js'
import markdown from '../../src/plugin.js'
nlp.plugin(markdown)

test('bindings - untouched contractions allow unrelated edits', t => {
  for (const input of ["I can't go to school.", "She's walking to school.", "We're going to school.", 'Take 10-20 books to school.']) {
    const doc = nlp.fromMarkdown(input)
    doc.updateTree()
    doc.match('school').replaceWith('work')
    doc.updateTree()
    t.equal(doc.markdown().trim(), input.replace('school', 'work'), 'unrelated word updates despite implicit terms')
    doc.updateTree()
    t.ok(doc.markdown().includes('work'), 'repeated write-back works')
  }
  t.end()
})

test('bindings - tokenizer-added whitespace does not reject input', t => {
  const doc = nlp.fromMarkdown('hello <3')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'hello <3', 'no-op keeps original token and spacing')
  doc.match('hello').replaceWith('goodbye')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'goodbye <3', 'unrelated edit is writable')
  t.end()
})

test('bindings - changes to implicit contraction terms fail atomically', t => {
  const doc = nlp.fromMarkdown("I can't go to school.")
  const original = doc.markdown()
  doc.match('school').replaceWith('work')
  doc.contractions().expand()
  t.throws(() => doc.updateTree(), /Cannot update tree/, 'unsupported contraction edit fails at write-back')
  t.equal(doc.markdown(), original, 'no partial changes reach the tree')
  t.end()
})
