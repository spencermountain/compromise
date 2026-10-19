import test from 'tape'
import nlp from './_lib.js'

const literal = (type, value) => ({ type, value })
const word = (value, tags) => {
  const node = { type: 'WordNode', children: [literal('TextNode', value)] }
  if (tags) {
    node.data = { compromise: { tags } }
  }
  return node
}
const sentence = children => ({ type: 'SentenceNode', children })
const root = children => ({
  type: 'RootNode',
  children: [{ type: 'ParagraphNode', children }],
})

test('fromAst imports literal values in order', t => {
  const ast = root([sentence([
    word('Hello'), literal('PunctuationNode', ','), literal('WhiteSpaceNode', ' '),
    word('world'), literal('PunctuationNode', '!'), literal('WhiteSpaceNode', '\r\n'),
    literal('SymbolNode', '😊'), literal('WhiteSpaceNode', ' '),
    literal('SourceNode', 'https://example.com'),
  ])])
  const before = JSON.stringify(ast)
  const doc = nlp.fromAst(ast)
  t.equal(doc.text(), 'Hello, world!\r\n😊 https://example.com', 'literal text preserved')
  t.ok(doc.has('world'), 'returns a usable compromise document')
  t.equal(JSON.stringify(ast), before, 'input AST unchanged')
  t.end()
})

test('fromAst does not invent whitespace between nodes', t => {
  const ast = root([sentence([
    { type: 'WordNode', children: [literal('TextNode', 'can'), literal('PunctuationNode', "'"), literal('TextNode', 't')] },
    literal('WhiteSpaceNode', ' '), word('stop'), literal('PunctuationNode', '.'),
  ])])
  t.equal(nlp.fromAst(ast).text(), "can't stop.", 'contraction reconstructed')
  t.equal(nlp.fromAst(root([sentence([word('a'), word('b')])])).text(), 'ab', 'adjacent words concatenate')
  t.end()
})

test('fromAst round-trips current exported text', t => {
  const inputs = [
    '', 'Hello world!', "I can't go. She won't stay.",
    '  Dr. Smith paid $3.50.\n\nAnother paragraph!  ',
    'Café 👩‍💻\r\nSecond line.', 'well-known words',
  ]
  inputs.forEach(input => {
    const doc = nlp(input)
    ;[{}, { tags: false, positions: false }].forEach(options => {
      const ast = doc.toAst(options)
      t.equal(nlp.fromAst(ast).text(), doc.text(), `round-trip ${JSON.stringify(input)}`)
    })
  })
  t.end()
})

test('fromAst restores word tags by text spans', t => {
  const ast = root([sentence([
    word('same', ['FirstMarker']), literal('WhiteSpaceNode', ' '),
    word('same', ['SecondMarker']), literal('WhiteSpaceNode', ' '),
    word('two words', ['PhraseMarker']),
  ])])
  // Stale source positions must not override the ordered literal values.
  ast.position = { start: { line: 99, column: 99, offset: 500 }, end: { line: 99, column: 99, offset: 500 } }
  const doc = nlp.fromAst(ast)
  t.equal(doc.match('#FirstMarker').text(), 'same', 'first marker restored')
  t.equal(doc.match('#SecondMarker').text(), 'same', 'second marker restored')
  t.ok(doc.terms().eq(0).has('#FirstMarker'), 'first occurrence tagged')
  t.notOk(doc.terms().eq(1).has('#FirstMarker'), 'first tag does not leak')
  t.ok(doc.terms().eq(1).has('#SecondMarker'), 'second occurrence tagged')
  t.equal(doc.match('#PhraseMarker+').text(), 'two words', 'all terms inside a word span tagged')
  t.notOk(nlp.fromAst(ast, { tags: false }).has('#FirstMarker'), 'tag restoration can be disabled')
  ast.children[0].children[0].children[0].data.compromise.tags.push('LaterMarker')
  t.notOk(doc.has('#LaterMarker'), 'imported tags detached')
  t.end()
})

test('fromAst accepts empty trees and standard root content', t => {
  t.equal(nlp.fromAst({ type: 'RootNode', children: [] }).text(), '', 'empty root')
  t.equal(nlp.fromAst({ type: 'RootNode', children: [sentence([word('Hello')])] }).text(), 'Hello', 'sentence root')
  t.equal(nlp.fromAst({ type: 'RootNode', children: [word('Hello')] }).text(), 'Hello', 'word root')
  t.end()
})

test('fromAst rejects malformed trees', t => {
  const invalid = [
    null, 'hello', {}, { type: 'UnknownNode', children: [] },
    { type: 'RootNode', children: 'hello' },
    root([sentence([literal('TextNode', 123)])]),
    root([sentence([null])]),
  ]
  invalid.forEach(ast => {
    t.throws(() => nlp.fromAst(ast), TypeError, 'invalid node rejected')
  })
  t.end()
})

test('fromAst validates tag metadata only when importing it', t => {
  ;['Noun', [null], ['']].forEach(tags => {
    const ast = root([sentence([word('Hello', tags)])])
    t.throws(() => nlp.fromAst(ast), TypeError, 'malformed tags rejected')
    t.equal(nlp.fromAst(ast, { tags: false }).text(), 'Hello', 'ignored metadata does not block text import')
  })
  t.end()
})

test('fromAst restores tags after Unicode and contraction spans', t => {
  const ast = root([sentence([
    literal('SymbolNode', '👩‍💻'), literal('WhiteSpaceNode', ' '),
    word("can't", ['ContractionMarker']), literal('WhiteSpaceNode', ' '),
    word('go', ['LastMarker']), literal('PunctuationNode', '.'),
  ])])
  const doc = nlp.fromAst(ast)
  t.ok(doc.match('can').has('#ContractionMarker'), 'written contraction term receives tags')
  t.equal(doc.match('#LastMarker').text(), 'go', 'later term uses UTF-16 offsets')
  t.notOk(doc.match('go').has('#ContractionMarker'), 'contraction tag stays within its span')
  t.end()
})

test('fromAst runs normal parsing and restores custom tags on full builds', async t => {
  const production = process.env.TESTENV === 'prod'
  const nlpPath = production ? '../../../builds/three/compromise-three.mjs' : '../../../src/three.js'
  const pluginPath = production ? '../builds/compromise-unist.mjs' : '../src/plugin.js'
  const { default: full } = await import(nlpPath)
  const { default: plugin } = await import(pluginPath)
  full.plugin(plugin)
  const original = full('Dogs run.').tag('RoundTripMarker')
  const restored = full.fromAst(original.toAst())
  t.equal(restored.text(), original.text(), 'full build text')
  t.equal(restored.match('#RoundTripMarker+').text(), 'Dogs run.', 'custom tag restored')
  t.ok(restored.has('#Noun'), 'normal tags available')
  const plain = full.fromAst(original.toAst(), { tags: false })
  t.notOk(plain.has('#RoundTripMarker'), 'custom tags skipped')
  t.ok(plain.has('#Noun'), 'tags false still parses the text normally')
  t.end()
})
