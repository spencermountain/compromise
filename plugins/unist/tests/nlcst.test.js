import test from 'tape'
import { assert as assertNlcst } from 'nlcst-test'
import nlp from './_lib.js'

const inputs = [
  '', 'Hello world!', "Bernardo: Who's there?",
  "I can't go. She won't stay.", 'well-known words',
  'Dr. Smith paid $3.50, €20, and 50%.',
  'Visit https://example.com/a?b=1 or email me@example.com.',
  '“Café” — naïve! 😊 👩‍💻 🇨🇦',
  '  Leading and trailing whitespace.\t ',
  'First sentence. Second sentence.\n\nNew paragraph.',
  'First\r\nsecond\r\n \t\r\nThird.',
  '!!! ... — ()',
]
const options = [{}, { tags: false }, { positions: false }, { tags: false, positions: false }]

test('toAst output passes nlcst-test', t => {
  inputs.forEach(input => {
    options.forEach(option => {
      const tree = nlp(input).toAst(option)
      t.doesNotThrow(() => assertNlcst(tree), `${JSON.stringify(input)} ${JSON.stringify(option)}`)
      const restored = nlp.fromAst(tree).toAst(option)
      t.doesNotThrow(() => assertNlcst(restored), 'round-trip tree is valid')
    })
  })
  t.end()
})

test('selected and transformed documents pass nlcst-test', t => {
  const doc = nlp('Alpha beta gamma delta.')
  const views = [doc.match('(Alpha|gamma)'), doc.match('missing'), doc.terms().eq(1)]
  doc.replace('beta', 'new words')
  views.push(doc)
  views.forEach(view => {
    t.doesNotThrow(() => assertNlcst(view.toAst()), 'valid exported view')
  })
  t.end()
})

test('nlcst-test checks descendants', t => {
  const tree = nlp('Hello world!').toAst()
  tree.children[0].children[0].children[0].children[0].value = 123
  t.throws(() => assertNlcst(tree), 'invalid nested literal is rejected')
  t.end()
})
