import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

test('html - boolean tag options override defaults', t => {
  const input = '<h1>Heading</h1><p>Before <code>example</code> after.</p><nav>Navigation</nav>'
  const doc = nlp.fromHtml(input, { h1: false, code: true, nav: false })
  t.notOk(doc.has('Heading'), 'skips disabled heading')
  t.notOk(doc.has('Navigation'), 'skips disabled navigation')
  t.ok(doc.has('Before example after'), 'enabled code joins surrounding prose')
  doc.match('example').replaceWith('sample')
  doc.updateHast()
  t.equal(doc.toHtml(), input.replace('example', 'sample'), 'preserves excluded elements and edits enabled text')
  t.end()
})

test('html - enabled tables retain cell boundaries', t => {
  const input = '<table><tbody><tr><td>First cell</td><td>Second cell</td></tr></tbody></table>'
  t.equal(nlp.fromHtml(input).text(), '', 'tables remain excluded by default')
  const doc = nlp.fromHtml(input, { table: true })
  t.ok(doc.has('First cell'), 'reads first cell')
  t.ok(doc.has('Second cell'), 'reads second cell')
  t.notOk(doc.has('cell Second'), 'does not match across cells')
  doc.match('First').replaceWith('Updated')
  doc.updateHast()
  t.equal(doc.toHtml(), input.replace('First', 'Updated'), 'writes enabled table text')
  t.end()
})

test('html - skipping parents and hidden elements', t => {
  const doc = nlp.fromHtml('<section><p>Secret</p></section><p hidden>Hidden</p><p>Visible</p>', {
    section: false, p: true,
  })
  t.equal(doc.text(), 'Visible', 'child option does not override skipped parent or hidden attribute')
  t.end()
})

test('html - HAST options and snapshots', t => {
  const word = { type: 'text', value: 'Example' }
  const tree = { type: 'root', children: [{ type: 'element', tagName: 'code', properties: {}, children: [word] }] }
  const options = { code: true }
  const doc = nlp.fromHast(tree, options)
  options.code = false
  doc.match('Example').replaceWith('Updated')
  doc.updateHast()
  t.equal(word.value, 'Updated', 'write-back uses the imported options snapshot')
  t.end()
})

test('html - custom tags and parser option coexist', t => {
  const doc = nlp.fromHtml('<body><custom-note>Secret</custom-note><p>Visible</p></body>', {
    fragment: false, 'custom-note': false,
  })
  t.equal(doc.text(), 'Visible', 'supports custom tag names')
  t.ok(doc.toHtml().includes('<html>'), 'fragment still controls parsing')
  t.end()
})

test('html - templates can be explicitly included', t => {
  const input = '<template><p>Example text.</p></template>'
  const doc = nlp.fromHtml(input, { template: true })
  t.ok(doc.has('Example text'), 'reads template content root')
  doc.match('Example').replaceWith('Updated')
  doc.updateHast()
  t.equal(doc.toHtml(), input.replace('Example', 'Updated'), 'updates template text in place')
  t.end()
})
