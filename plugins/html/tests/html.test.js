import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

test('html - parse, edit and serialize a fragment', t => {
  const doc = nlp.fromHtml('She <strong>walks</strong> to <a href="/school">school</a>.')
  t.ok(doc.has('walks to'), 'matches through inline markup')
  doc.verbs().toPastTense()
  doc.updateHast()
  t.equal(doc.toHtml(), 'She <strong>walked</strong> to <a href="/school">school</a>.', 'preserves markup and attributes')
  t.end()
})

test('html - entities decode for matching and escape on output', t => {
  const doc = nlp.fromHtml('<p>Cats &amp; dogs &lt; birds.</p>')
  t.equal(doc.text(), 'Cats & dogs < birds.', 'reads decoded entities')
  doc.match('Cats').replaceWith('Kittens')
  doc.updateHast()
  t.equal(nlp.fromHtml(doc.toHtml()).text(), 'Kittens & dogs < birds.', 'escaped output round-trips')
  t.end()
})

test('html - full documents exclude metadata and preserve skipped nodes', t => {
  const doc = nlp.fromHtml('<!doctype html><html><head><title>Secret title</title></head><body><p>Visible prose.</p><script>let secret = 1</script></body></html>', { fragment: false })
  t.equal(doc.text(), 'Visible prose.', 'reads body prose only')
  doc.match('Visible').replaceWith('Updated')
  doc.updateHast()
  const output = doc.toHtml()
  t.ok(output.includes('<title>Secret title</title>'), 'preserves head')
  t.ok(output.includes('<script>let secret = 1</script>'), 'preserves script')
  t.ok(output.includes('<p>Updated prose.</p>'), 'updates body')
  t.end()
})

test('html - split words and comments', t => {
  const doc = nlp.fromHtml('<p>She walk<!-- note --><em>ed</em> to school.</p>')
  t.ok(doc.has('walked to'), 'comments do not split words')
  doc.updateHast()
  t.ok(doc.toHtml().includes('walk<!-- note --><em>ed</em>'), 'preserves comment and split word')
  t.end()
})
