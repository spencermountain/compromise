import test from 'tape'
import nlp from './_lib.js'

const word = (value, tags = []) => ({
  type: 'WordNode', children: [{ type: 'TextNode', value }],
  data: { compromise: { tags } },
})
const sentence = children => ({ type: 'SentenceNode', children })
const root = children => ({ type: 'RootNode', children })
const literal = (type, value) => ({ type, value })

test('fromAst preserves explicit word boundaries', t => {
  const ast = root([sentence([
    word('New York', ['Place']), literal('WhiteSpaceNode', ' '),
    word("can't", ['CustomContraction']), literal('WhiteSpaceNode', ' '),
    word('well-known'), literal('WhiteSpaceNode', ' '), word('a', ['FirstMarker']), word('b', ['SecondMarker']),
  ])])
  const doc = nlp.fromAst(ast)
  t.deepEqual(doc.docs[0].map(term => term.text), ['New York', "can't", 'well-known', 'a', 'b'], 'one term per WordNode')
  t.equal(doc.text(), "New York can't well-known ab", 'exact text')
  t.ok(doc.terms().eq(3).has('#FirstMarker'), 'adjacent first word retains tags')
  t.notOk(doc.terms().eq(4).has('#FirstMarker'), 'adjacent words do not merge tags')
  t.ok(doc.terms().eq(4).has('#SecondMarker'), 'adjacent second word retains tags')
  t.equal(doc.match('#CustomContraction').text(), "can't", 'no implicit contraction terms')
  t.end()
})

test('fromAst preserves explicit sentence boundaries', t => {
  const ast = root([
    sentence([word('one'), literal('WhiteSpaceNode', ' ')]),
    sentence([word('two'), literal('PunctuationNode', '.'), literal('WhiteSpaceNode', ' '), word('three')]),
  ])
  const doc = nlp.fromAst(ast)
  t.equal(doc.docs.length, 2, 'uses the two supplied sentences')
  t.deepEqual(doc.docs.map(terms => terms.map(term => term.text)), [['one'], ['two', 'three']], 'punctuation does not split a supplied sentence')
  t.equal(doc.text(), 'one two. three', 'no added sentence separators')
  t.end()
})

test('fromAst preserves nonword content and whitespace-only trees', t => {
  const ast = root([{ type: 'ParagraphNode', children: [
    literal('WhiteSpaceNode', '\n\n'),
    sentence([
      literal('PunctuationNode', '“'), word('Hello'), literal('PunctuationNode', '!”'),
      literal('WhiteSpaceNode', '\t'), literal('SymbolNode', '😊'),
      literal('WhiteSpaceNode', ' '), literal('SourceNode', 'a b()'),
    ]),
    literal('WhiteSpaceNode', '\r\n\r\n'),
  ] }])
  const doc = nlp.fromAst(ast)
  t.equal(doc.text(), '\n\n“Hello!”\t😊 a b()\r\n\r\n', 'all literals preserved')
  t.deepEqual(doc.docs[0].map(term => term.text), ['Hello', '😊', 'a b()'], 'symbols and source are standalone terms')
  t.equal(nlp.fromAst(root([literal('WhiteSpaceNode', ' \t\n')])).text(), ' \t\n', 'whitespace-only tree retained')
  t.equal(nlp.fromAst(root([sentence([literal('PunctuationNode', '!!!')])])).text(), '!!!', 'punctuation-only sentence retained')
  t.end()
})

test('fromAst copies tags exactly and can skip them', t => {
  const ast = root([sentence([word('dog', ['CustomOnly'])])])
  const doc = nlp.fromAst(ast)
  t.deepEqual([...doc.docs[0][0].tags], ['CustomOnly'], 'no inferred tags')
  t.deepEqual([...nlp.fromAst(ast, { tags: false }).docs[0][0].tags], [], 'no tags when disabled')
  ast.children[0].children[0].data.compromise.tags.push('Later')
  t.notOk(doc.has('#Later'), 'tags detached')
  t.end()
})

test('imported terms support matching and edits without reparsing neighbors', t => {
  const doc = nlp.fromAst(root([sentence([
    word('Hello'), literal('WhiteSpaceNode', ' '), word('New York'),
    literal('WhiteSpaceNode', ' '), word("can't"),
  ])]))
  t.equal(doc.match('hello').text(), 'Hello', 'normalization supports lowercase matching')
  const selected = doc.terms().eq(1)
  t.equal(selected.text(), 'New York', 'multiword term is selectable')
  doc.match('hello').replaceWith('Hi')
  t.equal(selected.text(), 'New York', 'term IDs keep selections stable after editing')
  t.deepEqual(doc.docs[0].map(term => term.text), ['Hi', 'New York', "can't"], 'neighbor boundaries stay intact')
  t.end()
})
