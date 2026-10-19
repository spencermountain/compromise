import test from 'tape'
import nlp from './_lib.js'

test('markdown - named heading modes', t => {
  t.equal(nlp.fromMarkdown('### heading', { headings: 'keep' }).text(), '### heading', 'keep retains syntax')
  t.equal(nlp.fromMarkdown('### heading', { headings: 'skip' }).text(), '', 'skip excludes content')
  t.equal(nlp.fromMarkdown('### heading', { headings: 'inline' }).text(), 'heading', 'inline retains words')
  t.end()
})

test('markdown - link modes', t => {
  const md = 'Visit [school](https://school.org) today.'
  t.equal(nlp.fromMarkdown(md).text(), 'Visit school today.', 'links default to inline')
  t.equal(nlp.fromMarkdown(md, { links: 'keep' }).text(), md, 'keep includes link syntax and destination')
  const skipped = nlp.fromMarkdown(md, { links: 'skip' })
  t.notOk(skipped.has('school'), 'skip excludes link label')
  t.notOk(skipped.has('Visit today'), 'skipped link is a matching barrier')
  skipped.updateTree()
  t.equal(skipped.markdown().trim(), md, 'skipped link remains in tree')
  t.end()
})

test('markdown - nested wrappers and code modes', t => {
  const kept = nlp.fromMarkdown('A **very *nice*** day.', { strongs: 'keep', emphases: 'keep' })
  t.equal(kept.text(), 'A **very *nice*** day.', 'nested wrappers are ordered')
  kept.updateTree()
  t.equal(kept.markdown().trim(), 'A **very *nice*** day.', 'generated syntax does not change AST')
  t.equal(nlp.fromMarkdown('`hello`', { inlineCode: 'inline' }).text(), 'hello', 'inline code can expose content')
  t.equal(nlp.fromMarkdown('`hello`', { inlineCode: 'keep' }).text(), '`hello`', 'kept code has delimiters')
  t.end()
})

test('markdown - tables default to skip', t => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'table',
        children: [
          { type: 'tableRow', children: [{ type: 'tableCell', children: [{ type: 'text', value: 'cell' }] }] },
        ],
      },
    ],
  }
  t.equal(nlp.fromMdast(tree).text(), '', 'table omitted by default')
  t.equal(nlp.fromMdast(tree, { tables: 'inline' }).text(), 'cell', 'table text can be included')
  t.ok(nlp.fromMdast(tree, { tables: 'keep' }).text().includes('|'), 'kept table includes separators')
  t.end()
})
