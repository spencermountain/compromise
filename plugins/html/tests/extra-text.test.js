import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)

test('html - alt text and comments are opt-in', t => {
  const input = '<p>Visible.</p><img src="cat.png" alt="A sleepy cat"><!-- A quiet note. -->'
  const doc = nlp.fromHtml(input)
  t.equal(doc.text(), 'Visible.', 'both are excluded by default')
  doc.updateHast()
  t.equal(doc.toHtml(), input, 'excluded content remains intact')
  t.ok(nlp.fromHtml(input, { altText: true }).has('sleepy cat'), 'alt text can be read')
  t.notOk(nlp.fromHtml(input, { altText: true }).has('quiet note'), 'comments stay opt-in independently')
  t.ok(nlp.fromHtml(input, { comments: true }).has('quiet note'), 'comments can be read')
  t.notOk(nlp.fromHtml(input, { comments: true }).has('sleepy cat'), 'alt text stays opt-in independently')
  t.end()
})

test('html - extra text supports repeated write-back', t => {
  const input = '<img src="cat.png" alt="A sleepy cat"><!-- A quiet note. -->'
  const doc = nlp.fromHtml(input, { altText: true, comments: true })
  doc.match('sleepy').replaceWith('happy')
  doc.match('quiet').replaceWith('short')
  doc.updateHast()
  const expected = '<img src="cat.png" alt="A happy cat"><!-- A short note. -->'
  t.equal(doc.toHtml(), expected, 'writes to attribute and comment with original spacing')
  doc.toHtml({ format: true })
  doc.match('happy').replaceWith('very playful')
  doc.updateHast()
  t.equal(doc.toHtml(), expected.replace('happy', 'very playful'), 'replacement can grow after formatting')
  doc.updateHast()
  t.equal(doc.toHtml(), expected.replace('happy', 'very playful'), 'repeated update is stable')
  t.end()
})

test('html - extra text forms separate prose blocks', t => {
  const doc = nlp.fromHtml('Before<img alt="sleepy cat">after<!-- quiet note -->end', { altText: true, comments: true })
  t.ok(doc.has('sleepy cat'), 'matches within alt text')
  t.ok(doc.has('quiet note'), 'matches within comment')
  t.notOk(doc.has('Before sleepy'), 'does not enter alt text from surrounding prose')
  t.notOk(doc.has('cat after'), 'does not leave alt text into surrounding prose')
  t.notOk(doc.has('after quiet'), 'does not enter comment from surrounding prose')
  t.notOk(doc.has('note end'), 'does not leave comment into surrounding prose')
  t.ok(nlp.fromHtml('walk<!-- note -->ed').has('walked'), 'disabled comments still allow split-word matching')
  t.end()
})

test('html - exclusions take precedence over extra text', t => {
  const input = '<img alt="Secret"><section><!-- Private --><img alt="Hidden"></section><img hidden alt="Invisible"><p>Visible.</p>'
  const doc = nlp.fromHtml(input, { altText: true, comments: true, img: false, section: false })
  t.equal(doc.text(), 'Visible.', 'tag and parent exclusions still apply')
  const hidden = nlp.fromHtml('<img hidden alt="Invisible">', { altText: true })
  t.equal(hidden.text(), '', 'hidden attributes still apply')
  t.end()
})

test('html - caller-owned extra text and external mutation detection', t => {
  const img = { type: 'element', tagName: 'img', properties: { alt: 'Sleepy cat' }, children: [] }
  const comment = { type: 'comment', value: 'Quiet note' }
  const tree = { type: 'root', children: [img, comment] }
  const doc = nlp.fromHast(tree, { altText: true, comments: true })
  doc.match('Sleepy').replaceWith('Happy')
  doc.match('Quiet').replaceWith('Short')
  doc.updateHast()
  t.equal(img.properties.alt, 'Happy cat', 'updates caller-owned attribute')
  t.equal(comment.value, 'Short note', 'updates caller-owned comment')
  doc.match('Short').replaceWith('Long')
  img.properties.alt = 'External change'
  t.throws(() => doc.updateHast(), /changed/, 'detects external attribute changes')
  t.equal(comment.value, 'Short note', 'failure is atomic across attributes and comments')
  t.end()
})
