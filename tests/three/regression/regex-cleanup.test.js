import test from 'tape'
import nlp from '../_lib.js'
import pluckOut from '../../../src/1-one/change/api/lib/remove.js'
import { textFromTerms } from '../../../src/1-one/output/api/_text.js'
import isSentence from '../../../src/1-one/tokenize/methods/01-sentences/is-sentence.js'
import normalize from '../../../src/1-one/tokenize/methods/03-whitespace/tokenize.js'
import * as punctuation from '../../../src/1-one/tokenize/model/punctuation.js'

test('regex cleanup: removal repairs only the first qualifying run', t => {
  for (const [post, expected] of [
    ['   x', '   x'],
    [',,,x', ',,,x'],
    ['   !', '!'],
    [',;:!', '!'],
    ['  x  !  ?', '  x!  ?'],
    [',,x;;!,,?', ',,x!,,?'],
  ]) {
    const document = [
      [
        { text: 'one', post },
        { text: 'two', post: '' },
      ],
    ]
    pluckOut(document, [[0, 1, 2]])
    t.equal(document[0][0].post, expected, JSON.stringify(post))
  }
  t.end()
})

test('regex cleanup: output and sentence suffixes preserve behavior', t => {
  for (const [post, expected] of [
    [',,,x', 'word,,,x'],
    [',,,', 'word'],
    ['—”', 'word'],
    ['-', 'word '],
    [',\n', 'word,\n'],
    [' x!!', 'word x'],
  ]) {
    t.equal(textFromTerms([{ text: 'word', post, tags: new Set() }], { keepPunct: false }), expected)
  }
  for (const ending of ['..', '...', '…', '..   ', '…  ']) {
    t.notOk(isSentence('word' + ending, {}), `ellipsis ${ending}`)
  }
  for (const ending of ['.', '. ', '..xx', '...xx']) {
    t.ok(isSentence('word' + ending, {}), `not an ellipsis: ${ending}`)
  }
  for (const [text, ending] of [
    ['1001st', 'st'],
    ['1002nd', 'nd'],
    ['1003rd', 'rd'],
    ['1011th', 'th'],
  ]) {
    const doc = nlp(text)
    doc.numbers().toLocaleString()
    t.equal(doc.text(), Number.parseInt(text, 10).toLocaleString() + ending, text)
  }
  t.end()
})

test('regex cleanup: long rejecting inputs preserve behavior', t => {
  for (const [pattern, label] of [
    ['!'.repeat(100000) + 'x', 'negation prefix'],
    ['('.repeat(100000) + 'x', 'unclosed parentheses'],
    ['('.repeat(100000) + 'x)trailing', 'parentheses with trailing text'],
    ['!'.repeat(100000) + '(red|blue)', 'negated alternatives'],
  ]) {
    t.doesNotThrow(() => nlp.parseMatch(pattern), label)
  }
  const text = '!'.repeat(100000) + 'hello'
  const parts = normalize(text, { one: punctuation })
  t.equal(parts.pre + parts.str + parts.post, text, 'normalization preserves punctuation')
  const spaces = ' '.repeat(100000) + '!'
  t.equal(nlp(spaces).text(), spaces, 'leading spaces are preserved')
  for (const char of [' ', ',']) {
    const doc = nlp('one two')
    const post = char.repeat(100000) + 'x'
    doc.docs[0][0].post = post
    doc.remove('two')
    t.equal(doc.docs[0][0].post, post, `removal preserves a run of ${JSON.stringify(char)}`)
  }
  const post = ','.repeat(100000) + 'x'
  t.equal(
    textFromTerms([{ text: 'word', post, tags: new Set() }], { keepPunct: false }),
    'word' + post,
    'output preserves punctuation before text'
  )
  t.ok(isSentence('a' + '.'.repeat(100000) + 'xx', {}), 'non-ellipsis suffix is a sentence')
  t.end()
})
