import test from 'tape'
import { toString } from 'nlcst-to-string'
import nlp from './_lib.js'

const inputs = [
  '', "Bernardo: Who's there?", 'Hello world!',
  "I can't go. She won't stay. They've already left.",
  'well-known words and rock’n’roll',
  'Dr. Smith paid $1,234.56, €20, and 50%.',
  'Visit https://example.com/a?b=1&c=2 or email me@example.com.',
  '“Café” — naïve! 😊 👩‍💻 🇨🇦',
  '数学 and Ελληνικά.', '!!! ... — ()',
  '  Leading and trailing spaces.\t ',
  'First sentence. Second sentence.\n\nNew paragraph.',
  'First\r\nsecond\r\n \t\r\nThird.',
  'A\rB\nC\r\nD.',
]
const options = [{}, { tags: false }, { positions: false }, { tags: false, positions: false }]

const walk = (node, fn) => {
  fn(node)
  if (node.children) {
    node.children.forEach(child => walk(child, fn))
  }
}

test('nlcst-to-string reconstructs exported documents', t => {
  inputs.forEach(input => {
    const doc = nlp(input)
    options.forEach(option => {
      const tree = doc.toAst(option)
      const before = JSON.stringify(tree)
      const text = toString(tree)
      t.equal(text, input, `original text: ${JSON.stringify(input)} ${JSON.stringify(option)}`)
      t.equal(text, doc.text(), 'matches compromise text')
      t.equal(toString(tree.children), text, 'node arrays serialize identically')
      t.equal(nlp.fromAst(tree).text(), text, 'fromAst agrees with nlcst-to-string')
      t.equal(JSON.stringify(tree), before, 'serialization does not mutate the tree')
    })
  })
  t.end()
})

test('nlcst-to-string supports individual exported nodes', t => {
  const doc = nlp("Bernardo: Who's there?\r\n\r\nCafé 😊.")
  walk(doc.toAst(), node => {
    const { start, end } = node.position
    t.equal(toString(node), doc.text().slice(start.offset, end.offset), `${node.type} matches its text span`)
    if (node.children) {
      t.equal(toString(node.children), toString(node), 'child array has the same text')
    }
  })
  t.end()
})

test('nlcst-to-string preserves selections and current edits', t => {
  const doc = nlp('Alpha beta gamma delta.')
  t.equal(toString(doc.match('(Alpha|gamma)').toAst()), 'Alpha gamma ', 'selected terms retain their whitespace')
  t.equal(toString(doc.match('beta').toAst()), 'beta ', 'single term retains trailing whitespace')
  t.equal(toString(doc.match('missing').toAst()), '', 'unmatched view')
  doc.replace('beta', 'two new words')
  t.equal(toString(doc.toAst()), doc.text(), 'current text after replacement')
  const tree = nlp('Hello world!').toAst()
  const firstWord = tree.children[0].children[0].children[0]
  firstWord.children[0].value = 'Goodbye'
  t.equal(toString(tree), 'Goodbye world!', 'tree edits override old positions')
  t.equal(nlp.fromAst(tree).text(), toString(tree), 'import agrees after a tree edit')
  t.end()
})

test('nlcst-to-string sees only text retained by compromise', t => {
  const doc = nlp(' \t\r\n ')
  t.equal(toString(doc.toAst()), doc.text(), 'whitespace-only input follows the parsed document')
  t.end()
})
