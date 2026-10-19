import test from 'tape'
import nlp from '../../../../src/three.js'
import markdown from '../../src/markdown/plugin.js'
nlp.plugin(markdown)

test('markdown - heading modes', t => {
  const md = '### heading'
  t.equal(nlp.fromMarkdown(md, { headings: true }).text(), '### heading', 'true includes heading syntax')
  t.equal(nlp.fromMarkdown(md, { headings: false }).text(), '', 'false excludes headings')
  t.equal(nlp.fromMarkdown(md, { headings: 'inline' }).text(), 'heading', 'inline includes only heading text')
  t.end()
})

test('markdown - heading levels and formatted text', t => {
  const doc = nlp.fromMarkdown('# First\n\n### **Second** title\n\nBody text.', { headings: true })
  t.equal(doc.text(), '# First\n\n### Second title\n\nBody text.', 'prefixes follow each heading level')
  t.ok(doc.has('Second title'), 'inline formatting does not interrupt matching')
  doc.updateTree()
  doc.match('Second').replaceWith('Updated')
  doc.updateTree()
  t.equal(doc.markdown().trim(), '# First\n\n### **Updated** title\n\nBody text.', 'prefixes do not leak into AST text')
  t.end()
})

test('markdown - inline and excluded heading write-back', t => {
  const md = '### heading\n\nbody'
  const inline = nlp.fromMarkdown(md, { headings: 'inline' })
  inline.match('heading').replaceWith('title')
  inline.updateTree()
  t.equal(inline.markdown().trim(), '### title\n\nbody', 'inline mode still preserves heading structure')
  const excluded = nlp.fromMarkdown(md, { headings: false })
  excluded.match('body').replaceWith('updated')
  excluded.updateTree()
  t.equal(excluded.markdown().trim(), '### heading\n\nupdated', 'excluded headings remain untouched')
  t.end()
})
