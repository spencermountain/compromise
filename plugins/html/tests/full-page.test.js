import test from 'tape'
import { readFileSync } from 'node:fs'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)
const page = readFileSync(new URL('./examples/full-page.html', import.meta.url), 'utf8')

test('html - full page reading', t => {
  const doc = nlp.fromHtml(page, { fragment: false })
  t.ok(doc.has('walks to school'), 'matches through emphasis and links')
  t.ok(doc.has('walked together'), 'joins a word split by an element and comment')
  t.ok(doc.has('small nested phrase'), 'reads nested inline elements')
  t.ok(doc.has('Blue pencils'), 'reads nested lists')
  t.ok(doc.has('nested quotation'), 'reads nested blockquotes')
  t.ok(doc.has('school entrance'), 'reads figure captions')
  t.ok(doc.has('Thanks for reading'), 'reaches the footer')
  t.ok(doc.text().includes('Cats & dogs'), 'decodes ampersands')
  t.ok(doc.text().includes('Five < ten'), 'decodes less-than entities')
  t.notOk(doc.has('BoundaryAlpha BoundaryBeta'), 'paragraphs separate matches')
  t.notOk(doc.text().includes('BeforeBreakAfterBreak'), 'line breaks separate words')
  const excluded = ['headSecret', 'styleSecret', 'titleSecret', 'imageSecret', 'inlineSecret', 'blockSecret',
    'tableCaptionSecret', 'tableHeaderSecret', 'tableCellSecret', 'hiddenSecret', 'templateSecret', 'scriptSecret']
  excluded.forEach(word => {
    t.notOk(doc.has(word), `${word} is excluded from prose`)
  })
  t.end()
})

test('html - full page write-back and round-trip', t => {
  const doc = nlp.fromHtml(page, { fragment: false })
  const original = doc.html()
  doc.updateHast()
  t.equal(doc.html(), original, 'no-op preserves serialized tree')
  doc.match('walks').replaceWith('walked')
  doc.match('farewellToken').replaceWith('goodbyeToken')
  t.equal(doc.html(), original, 'serialization waits for explicit write-back')
  doc.updateHast()
  const output = doc.html()
  t.ok(output.includes('<strong>walked</strong>'), 'writes inside original emphasis')
  t.ok(output.includes('goodbyeToken'), 'writes near the end of the page')
  t.notOk(output.includes('farewellToken'), 'replaces original word')
  t.ok(output.includes('href="https://example.com/school"'), 'preserves link destination')
  t.ok(output.includes('alt="imageSecret"'), 'preserves image attributes')
  t.ok(output.includes('walk<!-- keep this comment --><em>ed</em>'), 'preserves untouched split word and comment')
  ;['headSecret', 'styleSecret', 'inlineSecret', 'blockSecret', 'tableCellSecret', 'hiddenSecret', 'templateSecret', 'scriptSecret'].forEach(word => {
    t.ok(output.includes(word), `preserves skipped ${word}`)
  })
  const reread = nlp.fromHtml(output, { fragment: false })
  t.ok(reread.has('walked to school'), 'updated inline prose parses again')
  t.ok(reread.has('goodbyeToken'), 'updated ending parses again')
  t.notOk(reread.has('hiddenSecret'), 'hidden content remains excluded')
  doc.updateHast()
  t.equal(doc.html(), output, 'repeated write-back is stable')
  t.end()
})
