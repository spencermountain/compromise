import test from 'tape'
import nlp from '../../../../src/three.js'
import markdown from '../../src/plugin.js'
nlp.plugin(markdown)

test('extensions - strikethrough modes', t => {
  const md = 'A ~~retired~~ word.'
  t.ok(nlp.fromMarkdown(md).has('retired'), 'strikethrough defaults to readable text')
  t.notOk(nlp.fromMarkdown(md, { deletions: 'skip' }).has('retired'), 'skip excludes deleted text')
  t.equal(nlp.fromMarkdown(md, { deletions: 'keep' }).text(), md, 'keep retains markers')
  const doc = nlp.fromMarkdown(md)
  doc.match('retired').replaceWith('renewed')
  doc.updateTree()
  t.equal(doc.markdown().trim(), 'A ~~renewed~~ word.', 'replacement preserves strikethrough')
  t.end()
})

test('extensions - task lists preserve checked state', t => {
  const md = '- [x] Finished work\n- [ ] Pending work'
  const doc = nlp.fromMarkdown(md)
  t.ok(doc.has('Finished work'), 'reads checked task')
  t.ok(doc.has('Pending work'), 'reads unchecked task')
  t.ok(doc.text().includes('[x] Finished work'), 'default keeps checked box')
  t.ok(doc.text().includes('[ ] Pending work'), 'default keeps unchecked box')
  const inline = nlp.fromMarkdown(md, { taskLists: 'inline' })
  t.notOk(inline.text().includes('[x]'), 'inline omits checkbox syntax')
  const kept = nlp.fromMarkdown(md, { lists: 'keep' })
  t.ok(kept.text().includes('[x] Finished work'), 'keep includes checked box')
  t.ok(kept.text().includes('[ ] Pending work'), 'keep includes unchecked box')
  t.equal(nlp.fromMarkdown(md, { lists: 'skip' }).text(), '', 'skip omits both tasks')
  doc.match('Pending').replaceWith('Upcoming')
  doc.updateTree()
  const output = doc.markdown()
  t.ok(output.includes('[x] Finished work'), 'checked state survives write-back')
  t.ok(output.includes('[ ] Upcoming work'), 'unchecked state survives text edits')
  t.end()
})

test('extensions - autolink literals', t => {
  const md = 'Visit www.example.com or https://example.org and email reader@example.net.'
  const inline = nlp.fromMarkdown(md)
  t.equal(inline.text(), md, 'default mode includes visible addresses')
  const skipped = nlp.fromMarkdown(md, { links: 'skip' })
  t.notOk(skipped.text().includes('www.example.com'), 'skip excludes www autolinks')
  t.notOk(skipped.text().includes('https://example.org'), 'skip excludes URL autolinks')
  t.notOk(skipped.text().includes('reader@example.net'), 'skip excludes email autolinks')
  skipped.updateTree()
  const reread = nlp.fromMarkdown(skipped.markdown())
  t.equal(reread.text(), md, 'excluded links survive serialization')
  t.end()
})

test('extensions - footnote modes and write-back', t => {
  const md = 'A sentence[^note].\n\n[^note]: Supporting explanation.'
  const doc = nlp.fromMarkdown(md)
  t.notOk(doc.text().includes('[^note]'), 'reference markers are omitted by default')
  t.ok(doc.has('Supporting explanation'), 'definitions are readable by default')
  const skipped = nlp.fromMarkdown(md, { footnoteDefinitions: 'skip', footnoteReferences: 'skip' })
  t.notOk(skipped.has('Supporting'), 'definition can be excluded')
  const kept = nlp.fromMarkdown(md, { footnoteDefinitions: 'keep', footnoteReferences: 'keep' })
  t.ok(kept.text().includes('sentence[^note]'), 'keep includes reference')
  t.ok(kept.text().includes('[^note]: Supporting'), 'keep includes definition marker')
  doc.match('Supporting').replaceWith('Additional')
  doc.updateTree()
  const output = doc.markdown()
  t.ok(output.includes('[^note]'), 'reference survives')
  t.ok(output.includes('[^note]: Additional explanation.'), 'definition edits preserve its identifier')
  t.end()
})

test('extensions - frontmatter modes and preservation', t => {
  const examples = [
    { fence: '---', option: 'yamlBlocks', metadata: 'title: SecretTitle' },
    { fence: '+++', option: 'tomlBlocks', metadata: 'title = "SecretTitle"' },
  ]
  examples.forEach(({ fence, option, metadata }) => {
    const md = `${fence}\n${metadata}\n${fence}\n\nVisible prose.`
    const doc = nlp.fromMarkdown(md)
    t.equal(doc.text(), 'Visible prose.', `${option} defaults to skip`)
    t.equal(nlp.fromMarkdown(md, { [option]: 'skip' }).text(), 'Visible prose.', 'explicit skip agrees')
    const inline = nlp.fromMarkdown(md, { [option]: 'inline' })
    t.ok(inline.text().includes(metadata), 'inline exposes metadata')
    t.notOk(inline.text().includes(fence), 'inline omits fences')
    const kept = nlp.fromMarkdown(md, { [option]: 'keep' })
    t.ok(kept.text().startsWith(`${fence}\n${metadata}\n${fence}`), 'keep retains both fences')
    kept.updateTree()
    t.ok(kept.markdown().includes(metadata), 'kept metadata survives write-back')
    doc.match('Visible').replaceWith('Updated')
    doc.updateTree()
    const output = doc.markdown()
    t.ok(output.startsWith(`${fence}\n${metadata}\n${fence}`), 'skipped metadata remains untouched')
    t.equal(nlp.fromMarkdown(output).text(), 'Updated prose.', 'edited document parses again')
  })
  t.end()
})

test('extensions - table alignment and escaped pipes', t => {
  const md = '| Left | Right |\n| :--- | ---: |\n| A \\| B | Ordinary cell |'
  t.equal(nlp.fromMarkdown(md).text(), '', 'table omitted by default')
  const doc = nlp.fromMarkdown(md, { tables: 'inline' })
  t.ok(doc.text().includes('A | B'), 'escaped pipe stays in its cell')
  t.ok(doc.has('Ordinary cell'), 'reads adjacent cell')
  doc.match('Ordinary').replaceWith('Updated')
  doc.updateTree()
  const output = doc.markdown()
  t.ok(output.includes('\\|'), 'literal pipe remains escaped')
  t.ok(/\|\s*:-+\s*\|\s*-+:\s*\|/.test(output), 'left and right alignment survive')
  t.ok(nlp.fromMarkdown(output, { tables: 'inline' }).has('Updated cell'), 'table edit round-trips')
  t.end()
})
