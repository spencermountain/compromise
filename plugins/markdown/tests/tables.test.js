import test from 'tape'
import nlp from './_lib.js'

const md = 'Before the table.\n\n| Item | Description |\n| :--- | ---: |\n| Notebook | A place to write |\n| Pencil | A drawing tool |\n\nAfter the table.'

test('markdown - parsed tables are skipped by default', t => {
  const doc = nlp.fromMarkdown(md)
  t.ok(doc.has('Before the table'), 'reads preceding prose')
  t.ok(doc.has('After the table'), 'reads following prose')
  t.notOk(doc.has('Notebook'), 'table body is excluded')
  t.notOk(doc.has('Description'), 'table header is excluded')
  const explicit = nlp.fromMarkdown(md, { tables: 'skip', tableRows: 'skip', tableCells: 'skip' })
  t.equal(explicit.text(), doc.text(), 'explicit skip options agree with defaults')
  doc.match('Before').replaceWith('Above')
  doc.updateTree()
  const output = doc.markdown()
  t.ok(output.includes('Notebook'), 'excluded table survives write-back')
  t.ok(output.includes('Above'), 'surrounding prose is updated')
  t.notOk(nlp.fromMarkdown(output).has('Notebook'), 'serialized output is still recognized as a table')
  t.end()
})

test('markdown - parsed tables support inline and keep modes', t => {
  const doc = nlp.fromMarkdown(md, { tables: 'inline' })
  t.ok(doc.has('Notebook'), 'inline includes cell content')
  t.ok(doc.has('A place to write'), 'matches within a cell')
  t.notOk(doc.has('Notebook A place'), 'matches cannot cross cell boundaries')
  doc.match('Notebook').replaceWith('Journal')
  doc.updateTree()
  const output = doc.markdown()
  const reread = nlp.fromMarkdown(output, { tables: 'inline' })
  t.ok(reread.has('Journal'), 'edited table serializes and parses again')
  t.notOk(reread.has('Notebook'), 'original word is replaced')
  const kept = nlp.fromMarkdown(md, { tables: 'keep' })
  t.ok(kept.text().includes('|'), 'keep includes table separators')
  kept.updateTree()
  t.ok(kept.markdown().includes('Notebook'), 'kept table supports unchanged write-back')
  t.end()
})

test('markdown - pipes in prose and code are not tables', t => {
  const doc = nlp.fromMarkdown('alpha | beta\n\n```\n| Hidden |\n| --- |\n| secret |\n```')
  t.ok(doc.has('alpha'), 'ordinary pipe-containing prose remains')
  t.ok(doc.has('beta'), 'reads both sides of prose pipe')
  t.notOk(doc.has('secret'), 'code remains excluded')
  doc.updateTree()
  t.ok(doc.markdown().includes('secret'), 'code is preserved')
  t.end()
})
