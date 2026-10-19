import test from 'tape'
import { readFileSync } from 'node:fs'
import nlp from './_lib.js'

const page = readFileSync(new URL('./examples/full-page.md', import.meta.url), 'utf8')

test('markdown - full page reading', t => {
  const doc = nlp.fromMarkdown(page)
  t.ok(doc.has('walked to'), 'matches across emphasis and link boundaries')
  t.ok(doc.has('walked together'), 'matches a word split by emphasis')
  t.ok(doc.has('Lemons are sour'), 'reads nested lists')
  t.ok(doc.has('nested quotation'), 'reads nested blockquotes')
  t.ok(doc.has('farewellToken'), 'reaches the end of the document')
  t.notOk(doc.has('alpha Standalone'), 'paragraph boundaries prevent cross-block matches')
  const excluded = ['inlineSecret', 'fencedSecret', 'indentedSecret', 'imageSecret', 'referenceImageSecret', 'htmlSecret']
  excluded.forEach(word => {
    t.notOk(doc.has(word), `${word} is excluded by default`)
  })
  t.end()
})

test('markdown - full page options', t => {
  const skipped = nlp.fromMarkdown(page, { headings: 'skip' })
  t.notOk(skipped.has('A smaller heading'), 'headings can be omitted')
  t.ok(skipped.has('farewellToken'), 'body survives heading exclusion')
  const kept = nlp.fromMarkdown(page, { headings: 'keep', links: 'keep' })
  t.ok(kept.text().includes('### A smaller heading'), 'keeps heading syntax')
  t.ok(kept.text().includes('[school](https://school.org)'), 'keeps link syntax')
  t.end()
})

test('markdown - full page write-back', t => {
  const doc = nlp.fromMarkdown(page)
  const original = doc.markdown()
  doc.updateTree()
  t.equal(doc.markdown(), original, 'no-op update preserves the serialized tree')
  doc.match('farewellToken').replaceWith('goodbyeToken')
  doc.updateTree()
  const output = doc.markdown()
  t.ok(output.includes('goodbyeToken'), 'writes a targeted edit near the end')
  t.notOk(output.includes('farewellToken'), 'replaces the original word')
  t.ok(output.includes('fencedSecret'), 'preserves excluded code')
  t.ok(output.includes('htmlSecret'), 'preserves excluded HTML')
  t.ok(output.includes('https://school.org'), 'preserves link destinations')
  t.ok(output.includes('https://example.org/picture.png'), 'preserves images')
  doc.updateTree()
  t.equal(doc.markdown(), output, 'repeated write-back is stable')
  t.end()
})
