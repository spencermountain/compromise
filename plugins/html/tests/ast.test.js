import test from 'tape'
import nlp from '../../../src/three.js'
import html from './_plugin.js'

nlp.plugin(html)
const text = value => ({ type: 'text', value })
const element = (tagName, children, properties = {}) => ({ type: 'element', tagName, properties, children })
const root = children => ({ type: 'root', children })

test('html - matching and editing across inline elements', t => {
  const word = text('walks')
  const tree = root([element('p', [text('She '), element('strong', [word]), text(' to '), element('a', [text('school')], { href: '/school' }), text('.')])])
  const doc = nlp.fromHast(tree)
  t.equal(doc.text(), 'She walks to school.', 'reads visible text')
  t.ok(doc.has('walks to'), 'matches across inline boundary')
  doc.verbs().toPastTense()
  doc.updateHast()
  t.equal(word.value, 'walked', 'writes tense change to original text node')
  t.equal(tree.children[0].children[3].properties.href, '/school', 'preserves attributes')
  doc.updateHast()
  t.equal(word.value, 'walked', 'repeated update is stable')
  t.end()
})

test('html - split words are readable but edits fail atomically', t => {
  const first = text('She ')
  const tree = root([element('p', [first, text('walk'), element('em', [text('ed')]), text(' to school.')])])
  const doc = nlp.fromHast(tree)
  t.ok(doc.has('walked to'), 'one word can span multiple nodes')
  t.doesNotThrow(() => doc.updateHast(), 'unchanged split word survives')
  doc.match('She').replaceWith('He')
  doc.match('walked').replaceWith('ran')
  t.throws(() => doc.updateHast(), /ownership|nodes/, 'ambiguous edit fails at write-back')
  t.equal(first.value, 'She ', 'failure leaves earlier nodes unchanged')
  t.end()
})

test('html - block and skipped-content boundaries', t => {
  const tree = root([
    element('p', [text('First')]), element('p', [text('Second')]),
    element('script', [text('scriptSecret')]), element('style', [text('styleSecret')]),
    element('template', [text('templateSecret')]), element('p', [text('hiddenSecret')], { hidden: true }),
    element('table', [element('tr', [element('td', [text('tableSecret')])])]),
    element('p', [text('Last'), element('br', []), text('line')]),
  ])
  const doc = nlp.fromHast(tree)
  t.ok(doc.has('First'), 'reads first block')
  t.ok(doc.has('Second'), 'reads second block')
  t.notOk(doc.has('First Second'), 'matches cannot cross blocks')
  t.notOk(doc.text().includes('Secret'), 'skips non-prose and hidden content')
  t.notOk(doc.text().includes('Lastline'), 'breaks do not join words')
  t.doesNotThrow(() => doc.updateHast(), 'unchanged document writes back')
  t.end()
})

test('html - external text changes are rejected', t => {
  const node = text('Original prose.')
  const doc = nlp.fromHast(root([element('p', [node])]))
  node.value = 'External edit.'
  t.throws(() => doc.updateHast(), /changed/, 'detects stale source tree')
  t.equal(node.value, 'External edit.', 'preserves external edit')
  t.end()
})
