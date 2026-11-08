import test from 'tape'
import nlp from '../../../../src/three.js'
import markdown from '../../src/plugin.js'
nlp.plugin(markdown)

test('options - task lists are independent of ordinary lists', t => {
  const md = '- Ordinary item\n- [x] Completed task\n- [ ] Pending task'
  const skipped = nlp.fromMarkdown(md, { taskLists: 'skip' })
  t.ok(skipped.has('Ordinary item'), 'ordinary item remains')
  t.notOk(skipped.has('Completed'), 'checked task excluded')
  t.notOk(skipped.has('Pending'), 'unchecked task excluded')
  const kept = nlp.fromMarkdown(md, { lists: 'inline', taskLists: 'keep' })
  t.ok(kept.text().includes('[x] Completed task'), 'task syntax can be kept independently')
  t.notOk(kept.text().includes('- Ordinary'), 'ordinary item stays inline')
  kept.updateTree()
  t.ok(kept.markdown().includes('[ ] Pending'), 'checkboxes survive write-back')
  t.end()
})

test('options - autolinks are distinct from labeled links', t => {
  const md = 'Visit www.example.com, https://example.org, reader@example.net, <https://example.net>, and [our site](https://site.example).'
  const doc = nlp.fromMarkdown(md, { autolinks: 'skip' })
  t.ok(doc.has('our site'), 'labeled link remains')
  t.notOk(doc.text().includes('www.example.com'), 'bare www excluded')
  t.notOk(doc.text().includes('https://example.org'), 'bare URL excluded')
  t.notOk(doc.text().includes('reader@example.net'), 'email excluded')
  t.notOk(doc.text().includes('https://example.net'), 'angle autolink excluded')
  doc.updateTree()
  t.ok(doc.markdown().includes('www.example.com'), 'excluded autolink preserved')
  const labeled = nlp.fromMarkdown('[https://example.org](https://example.org)', { autolinks: 'skip' })
  t.ok(labeled.text().includes('https://example.org'), 'explicit link is not classified by label alone')
  t.end()
})

test('options - footnote group and specific overrides', t => {
  const md = 'A note[^one].\n\n[^one]: Explanation here.'
  const skipped = nlp.fromMarkdown(md, { footnotes: 'skip' })
  t.notOk(skipped.has('Explanation'), 'group excludes definition')
  t.notOk(skipped.text().includes('[^one]'), 'group excludes reference')
  const kept = nlp.fromMarkdown(md, { footnotes: 'keep' })
  t.ok(kept.text().includes('[^one]:'), 'group keeps definition syntax')
  const override = nlp.fromMarkdown(md, { footnotes: 'skip', footnoteDefinitions: 'inline' })
  t.ok(override.has('Explanation here'), 'specific definition option wins')
  skipped.updateTree()
  t.ok(skipped.markdown().includes('Explanation here'), 'skipped definition preserved')
  t.end()
})

test('options - frontmatter group and specific overrides', t => {
  for (const [fence, option] of [['---', 'yamlBlocks'], ['+++', 'tomlBlocks']]) {
    const md = `${fence}\ntitle: HiddenTitle\n${fence}\n\nBody prose.`
    const kept = nlp.fromMarkdown(md, { frontmatter: 'keep' })
    t.ok(kept.text().startsWith(fence), `${option} inherits group mode`)
    const inline = nlp.fromMarkdown(md, { frontmatter: 'keep', [option]: 'inline' })
    t.notOk(inline.text().includes(fence), 'specific mode overrides group')
    t.ok(inline.text().includes('HiddenTitle'), 'inline retains metadata')
    kept.updateTree()
    t.ok(kept.markdown().includes('HiddenTitle'), 'metadata preserved')
  }
  t.end()
})
