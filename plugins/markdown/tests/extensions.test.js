import test from 'tape'
import nlp from './_lib.js'

test('markdown - GFM prose and write-back', t => {
  const md = '- [x] Finished task\n- [ ] Pending task\n\nSome ~~outdated~~ prose at www.example.com.\n\nA note[^one].\n\n[^one]: Footnote explanation.'
  const doc = nlp.fromMarkdown(md)
  t.ok(doc.has('Finished task'), 'task text is readable')
  t.ok(doc.has('outdated'), 'strikethrough text is readable')
  t.ok(doc.has('Footnote explanation'), 'footnote definition is readable')
  t.notOk(nlp.fromMarkdown(md, { deletions: 'skip' }).has('outdated'), 'strikethrough can be excluded')
  doc.match('outdated').replaceWith('updated')
  doc.updateTree()
  const out = doc.markdown()
  t.ok(out.includes('~~updated~~'), 'strikethrough survives edits')
  t.ok(out.includes('[x] Finished'), 'checked task survives')
  t.ok(out.includes('[ ] Pending'), 'unchecked task survives')
  t.ok(out.includes('[^one]'), 'footnotes serialize')
  t.ok(nlp.fromMarkdown(md, { lists: 'keep' }).text().includes('[x] Finished'), 'keep exposes checkbox syntax')
  t.ok(nlp.fromMarkdown(md, { footnoteDefinitions: 'keep', footnoteReferences: 'keep' }).text().includes('[^one]:'), 'keep exposes definition syntax')
  t.end()
})

test('markdown - YAML and TOML frontmatter modes', t => {
  for (const [fence, field] of [['---', 'yamlBlocks'], ['+++', 'tomlBlocks']]) {
    const md = `${fence}\nsecretMetadata: hidden\n${fence}\n\nVisible body.`
    const doc = nlp.fromMarkdown(md)
    t.equal(doc.text(), 'Visible body.', `${field} skipped by default`)
    doc.match('Visible').replaceWith('Updated')
    doc.updateTree()
    t.ok(doc.markdown().includes('secretMetadata: hidden'), 'metadata survives write-back')
    t.ok(doc.markdown().includes('Updated body.'), 'prose edit survives')
    const inline = nlp.fromMarkdown(md, { [field]: 'inline' })
    t.ok(inline.text().includes('secretMetadata: hidden'), 'inline includes metadata')
    const kept = nlp.fromMarkdown(md, { [field]: 'keep' })
    t.ok(kept.text().startsWith(fence + '\n'), 'keep includes opening fence')
    kept.updateTree()
    t.ok(kept.markdown().includes('secretMetadata: hidden'), 'kept metadata writes back')
  }
  t.end()
})

test('markdown - externally parsed trees', t => {
  const tree = { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', value: 'External prose.' }] }] }
  const doc = nlp.fromMdast(tree)
  doc.match('External').replaceWith('Updated')
  doc.updateTree()
  t.equal(tree.children[0].children[0].value, 'Updated prose.', 'fromMdast updates caller-owned nodes')
  t.throws(() => nlp.fromMdast({ type: 'customUnsupported', value: 'hello' }), /Unsupported Markdown node/, 'unknown extensions need a node handler')
  t.end()
})
