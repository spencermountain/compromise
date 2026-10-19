import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

test('html - source whitespace does not split prose', t => {
  const input = '<p>She\n\n<strong>walks</strong>\t  home.</p>'
  const doc = nlp.fromHtml(input)
  t.equal(doc.text(), 'She walks home.', 'collapses source whitespace for reading')
  t.ok(doc.has('She walks home'), 'matches through blank lines and inline elements')
  doc.updateHast()
  t.equal(doc.html(), input, 'no-op retains original separators')
  doc.verbs().toPastTense()
  doc.updateHast()
  t.equal(doc.html(), input.replace('walks', 'walked'), 'editing preserves original whitespace')
  doc.updateHast()
  t.equal(doc.html(), input.replace('walks', 'walked'), 'repeated write-back is stable')
  t.end()
})

test('html - whitespace runs cross text nodes', t => {
  const input = '<p>She \n<span>\t </span><em> walks</em> home.</p>'
  const doc = nlp.fromHtml(input)
  t.equal(doc.text(), 'She walks home.', 'one separator spans multiple nodes')
  doc.match('walks').replaceWith('runs')
  doc.updateHast()
  t.equal(doc.html(), input.replace('walks', 'runs'), 'retains whitespace in each original owner')
  t.end()
})

test('html - HAST whitespace and empty text nodes', t => {
  const children = ['', 'She\r\n\t\f ', '', 'walks', '  home.', ''].map(value => ({ type: 'text', value }))
  const doc = nlp.fromHast({ type: 'root', children })
  t.equal(doc.text(), 'She walks home.', 'collapses HTML ASCII whitespace')
  doc.match('walks').replaceWith('runs')
  doc.updateHast()
  t.deepEqual(children.map(node => node.value), ['', 'She\r\n\t\f ', '', 'runs', '  home.', ''], 'preserves source characters and empty nodes')
  t.end()
})

test('html - block boundaries survive whitespace normalization', t => {
  const doc = nlp.fromHtml('<p>First</p>\n\n<p>Second</p>')
  t.notOk(doc.has('First Second'), 'does not merge separate blocks')
  t.doesNotThrow(() => doc.updateHast(), 'whitespace-only runs remain writable')
  t.end()
})

test('html - special elements are excluded and preserved', t => {
  const snippets = [
    '<select><option>walks</option><option>runs</option></select>',
    '<textarea>private prose</textarea>',
    '<svg><title>chart label</title><text>world</text></svg>',
    '<math><mi>variable</mi><mo>+</mo><mn>1</mn></math>',
  ]
  snippets.forEach(snippet => {
    const doc = nlp.fromHtml(`<p>Before.</p>${snippet}<p>After.</p>`)
    t.equal(doc.text(), 'Before.\n\nAfter.', 'special subtree contributes no prose')
    doc.match('After').replaceWith('Later')
    doc.updateHast()
    t.equal(doc.html(), `<p>Before.</p>${snippet}<p>Later.</p>`, 'preserves skipped subtree during nearby edit')
  })
  t.end()
})
