import test from 'tape'
import nlp from './_lib.js'

const flatten = node => node.value ?? node.children.map(flatten).join('')
const visit = (node, fn) => {
  fn(node)
  if (node.children) {
    node.children.forEach(child => visit(child, fn))
  }
}

test('ast preserves current document text and positions', t => {
  const examples = [
    'Hello world!', "I can't go. She won't stay.", 'well-known words',
    'Dr. Smith paid $3.50 😊 https://example.com.',
    '  Hello\r\n\r\nworld!  ', 'A\nline. Another sentence.',
    '“Café” — yes! 👩‍💻', '',
  ]
  examples.forEach(text => {
    const doc = nlp(text)
    const before = JSON.stringify(doc.json())
    const tree = doc.toAst()
    t.equal(tree.type, 'RootNode', 'root')
    t.equal(flatten(tree), doc.text(), 'text roundtrip')
    t.equal(JSON.stringify(doc.json()), before, 'document unchanged')
    t.deepEqual(JSON.parse(JSON.stringify(tree)), tree, 'serializable')
    visit(tree, node => {
      const { start, end } = node.position
      t.equal(doc.text().slice(start.offset, end.offset), flatten(node), 'position slice')
    })
  })
  t.end()
})

test('ast options and hierarchy', t => {
  const doc = nlp('Hello world!\n\nNext paragraph.')
  const tree = doc.toAst()
  t.equal(tree.children.length, 2, 'paragraphs')
  const word = tree.children[0].children[0].children[0]
  t.equal(word.type, 'WordNode', 'word')
  t.ok(Array.isArray(word.data.compromise.tags), 'tags are arrays')
  word.data.compromise.tags.push('Custom')
  t.notOk(doc.has('#Custom'), 'tags detached')
  visit(doc.toAst({ tags: false, positions: false }), node => {
    t.notOk(node.data, 'no metadata')
    t.notOk(node.position, 'no positions')
  })
  const selected = nlp('one two three four').match('(one|three)').toAst()
  t.equal(selected.children[0].children.filter(n => n.type === 'SentenceNode').length, 2, 'separate matches')
  t.end()
})

test('ast CRLF and edited documents', t => {
  const doc = nlp('Hello\r\nworld.')
  t.equal(doc.toAst().children.length, 1, 'one newline is not a paragraph break')
  doc.replace('world', 'everyone')
  const tree = doc.toAst()
  t.equal(flatten(tree), doc.text(), 'exports edited text')
  t.equal(tree.position.end.offset, doc.text().length, 'fresh offsets')
  t.equal(tree.position.end.line, 2, 'CRLF is one newline')
  t.end()
})

test('ast copies parsed tags', async t => {
  const { default: full } = await import('../../../src/three.js')
  const { default: plugin } = await import('../src/plugin.js')
  full.plugin(plugin)
  const doc = full('Dogs run.')
  const word = doc.toAst().children[0].children[0].children[0]
  t.ok(word.data.compromise.tags.includes('Noun'), 'parsed noun tag included')
  word.data.compromise.tags.length = 0
  t.ok(doc.has('#Noun'), 'clearing exported tags leaves document intact')
  t.end()
})
