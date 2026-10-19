import test from 'tape'
import nlp from './_lib.js'

const flatten = node => node.value ?? node.children.map(flatten).join('')
const walk = (node, fn) => {
  fn(node)
  if (node.children) {
    node.children.forEach(child => walk(child, fn))
  }
}
const allowed = {
  RootNode: ['ParagraphNode'],
  ParagraphNode: ['SentenceNode', 'WhiteSpaceNode', 'SourceNode'],
  SentenceNode: ['WordNode', 'PunctuationNode', 'SymbolNode', 'WhiteSpaceNode', 'SourceNode'],
  WordNode: ['TextNode', 'PunctuationNode', 'SymbolNode', 'SourceNode'],
}

// Expectations come from NLCST's node content models.
test('ast legal node nesting and lossless literals', t => {
  const examples = [
    '"Hello," she said. (Really?)',
    "We're sure they've said it isn't ready.",
    'state-of-the-art: mother-in-law; rock’n’roll.',
    'Prof. Jones met Dr. Brown at 3 p.m.',
    'Prices: $1,234.56, €20, 50%, and -3.5.',
    'Email me@example.com or visit https://example.com/a?b=1&c=2.',
    '数学, café, naïve, Ελληνικά, and Москва.',
    '😊 👩‍💻 🇨🇦 + = © ™',
    '\tLeading spaces.\t\tTrailing spaces.  ',
    'First\n\nSecond\n \t\nThird',
    'First\r\n\r\nSecond\r\rThird',
    '!!! ... — ()',
  ]
  examples.forEach(input => {
    const doc = nlp(input)
    const tree = doc.toAst()
    t.equal(flatten(tree), doc.text(), `preserves ${JSON.stringify(input)}`)
    walk(tree, node => {
      if (allowed[node.type]) {
        t.ok(Array.isArray(node.children), `${node.type} has children`)
        t.notOk('value' in node, 'parent has no literal value')
        node.children.forEach(child => {
          t.ok(allowed[node.type].includes(child.type), `${node.type} accepts ${child.type}`)
        })
      } else {
        t.ok(['TextNode', 'PunctuationNode', 'SymbolNode', 'WhiteSpaceNode', 'SourceNode'].includes(node.type), 'known literal')
        t.equal(typeof node.value, 'string', 'literal string')
        t.notOk('children' in node, 'literal has no children')
      }
    })
  })
  t.end()
})

test('ast exact UTF-16 positions with mixed line endings', t => {
  const input = 'A😊\r\nB\nC\rD.'
  const tree = nlp(input).toAst()
  const starts = [0, 5, 7, 9]
  const point = offset => {
    let line = 0
    starts.forEach((start, i) => {
      if (start <= offset) {
        line = i
      }
    })
    return { line: line + 1, column: offset - starts[line] + 1, offset }
  }
  walk(tree, node => {
    const { start, end } = node.position
    t.deepEqual(start, point(start.offset), 'start coordinate')
    t.deepEqual(end, point(end.offset), 'end coordinate')
    t.equal(input.slice(start.offset, end.offset), flatten(node), 'exact slice')
    if (node.children) {
      node.children.forEach(child => {
        t.ok(child.position.start.offset >= start.offset, 'child starts within parent')
        t.ok(child.position.end.offset <= end.offset, 'child ends within parent')
      })
    }
  })
  t.deepEqual(tree.position.end, { line: 4, column: 3, offset: 11 }, 'final coordinate')
  t.end()
})

test('ast paragraph boundaries distinguish one and two line endings', t => {
  ['\n', '\r', '\r\n'].forEach(newline => {
    t.equal(nlp(`First${newline}second`).toAst().children.length, 1, 'single newline')
    t.equal(nlp(`First${newline}${newline}second`).toAst().children.length, 2, 'blank line')
    t.equal(nlp(`First${newline} \t${newline}second`).toAst().children.length, 2, 'blank line with spaces')
  })
  t.end()
})

test('ast empty and unmatched views', t => {
  [nlp(''), nlp('hello').match('missing')].forEach(doc => {
    t.deepEqual(doc.toAst({ positions: false }), { type: 'RootNode', children: [] }, 'empty root')
    t.deepEqual(doc.toAst().position, {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 1, column: 1, offset: 0 },
    }, 'empty position')
  })
  t.end()
})

test('ast selections retain match boundaries and local positions', t => {
  const selected = nlp('Alpha beta gamma delta.').match('(Alpha|gamma)')
  const tree = selected.toAst()
  const sentences = tree.children.flatMap(p => p.children).filter(n => n.type === 'SentenceNode')
  t.equal(sentences.length, 2, 'two separate fragments')
  t.equal(flatten(sentences[0]).trim(), 'Alpha', 'first match')
  t.equal(flatten(sentences[1]).trim(), 'gamma', 'second match')
  t.equal(tree.position.start.offset, 0, 'positions start locally')
  walk(tree, node => {
    t.equal(flatten(tree).slice(node.position.start.offset, node.position.end.offset), flatten(node), 'selection position slice')
  })
  t.end()
})

test('ast options are independent and exported trees are detached', t => {
  const doc = nlp('Hello world.')
  const original = doc.toAst()
  const withTags = doc.toAst({ positions: false })
  const withoutTags = doc.toAst({ tags: false })
  walk(withTags, node => {
    t.notOk(node.position, 'positions disabled throughout')
    if (node.type === 'WordNode') {
      t.ok(Array.isArray(node.data.compromise.tags), 'tags still included')
    }
  })
  walk(withoutTags, node => {
    t.ok(node.position, 'positions still included')
    t.notOk(node.data, 'tags disabled throughout')
  })
  const changed = doc.toAst()
  changed.children[0].children.length = 0
  changed.position.start.line = 99
  t.deepEqual(doc.toAst(), original, 'tree mutations cannot affect later exports')
  t.equal(doc.text(), 'Hello world.', 'document text unchanged')
  t.end()
})
