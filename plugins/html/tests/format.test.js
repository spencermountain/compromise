import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

test('html - optional formatting leaves the source tree untouched', t => {
  const input = '<div><p>Hello.</p><p>World.</p></div>'
  const doc = nlp.fromHtml(input)
  t.equal(doc.html(), input, 'default output is unchanged')
  t.equal(doc.html({ format: false }), input, 'explicit false disables formatting')
  const formatted = doc.html({ format: true })
  t.ok(formatted.includes('\n  <p>Hello.</p>\n  <p>World.</p>\n'), 'indents block elements')
  t.equal(doc.html(), input, 'formatting does not mutate the bound tree')
  t.equal(doc.html({ format: true }), formatted, 'formatting is repeatable')
  doc.match('World').replaceWith('Everyone')
  t.equal(doc.html({ format: true }), formatted, 'formatting does not implicitly apply edits')
  doc.updateHast()
  t.equal(doc.html(), input.replace('World', 'Everyone'), 'write-back still works after formatting')
  t.ok(doc.html({ format: true }).includes('<p>Everyone.</p>'), 'formats the updated tree')
  t.end()
})

test('html - formatting preserves inline words and sensitive content', t => {
  const input = '<div><p>She walk<em>ed</em> home.</p><pre>  a\n    b</pre><textarea>  c\n d</textarea><script>const x = " a  b ";</script></div>'
  const doc = nlp.fromHtml(input)
  const formatted = doc.html({ format: true })
  t.ok(nlp.fromHtml(formatted).has('walked home'), 'formatting does not split inline words')
  t.ok(formatted.includes('<pre>  a\n    b</pre>'), 'preserves preformatted whitespace')
  t.ok(formatted.includes('<textarea>  c\n d</textarea>'), 'preserves textarea whitespace')
  t.ok(formatted.includes('<script>const x = " a  b ";</script>'), 'preserves script content')
  t.doesNotThrow(() => doc.updateHast(), 'original bindings remain valid')
  t.equal(doc.html(), input, 'source spelling remains unchanged')
  t.end()
})
