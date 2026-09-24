import test from 'tape'
import nlp from '../../_lib.js'

test('regex cleanup: removal repairs only the first qualifying run', t => {
  for (const [post, expected] of [
    ['   x', '   x'],
    [',,,x', ',,,x'],
    ['   !', '!'],
    [',;:!', '!'],
    ['  x  !  ?', '  x!  ?'],
    [',,x;;!,,?', ',,x!,,?'],
  ]) {
    const doc = nlp('one two')
    doc.match('one').post(post)
    doc.remove('two')
    t.equal(doc.text(), 'one' + expected, JSON.stringify(post))
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
    t.equal(nlp('word').post(post).text({ keepPunct: false }), expected)
  }
  for (const ending of ['..', '...', '…', '..   ', '…  ']) {
    const text = 'word' + ending + ' Next'
    t.deepEqual(nlp(text).out('array'), [text], `ellipsis stays in the sentence: ${ending}`)
  }
  for (const ending of ['.', '. ']) {
    t.deepEqual(nlp('word' + ending + ' Next').out('array'), ['word.', 'Next'], 'period ends a sentence')
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
  t.equal(nlp(text).text(), text, 'tokenization preserves punctuation')
  const spaces = ' '.repeat(100000) + '!'
  t.equal(nlp(spaces).text(), spaces, 'leading spaces are preserved')
  for (const char of [' ', ',']) {
    const doc = nlp('one two')
    const post = char.repeat(100000) + 'x'
    doc.match('one').post(post)
    doc.remove('two')
    t.equal(doc.text(), 'one' + post, `removal preserves a run of ${JSON.stringify(char)}`)
  }
  const post = ','.repeat(100000) + 'x'
  t.equal(
    nlp('word').post(post).text({ keepPunct: false }),
    'word' + post,
    'output preserves punctuation before text'
  )
  const dotted = 'a' + '.'.repeat(100000) + 'xx'
  t.deepEqual(nlp(dotted).out('array'), [dotted], 'long internal dot run remains intact')
  t.end()
})

test('pluralization handles irregular endings through noun selections', t => {
  for (const [singular, plural] of [['mouse', 'mice'], ['louse', 'lice'], ['house', 'houses'], ['slice', 'slices']]) {
    // Supply the noun reading explicitly to test inflection rather than ambiguity.
    const doc = nlp('the ' + singular, { [singular]: 'Singular' })
    doc.nouns().toPlural()
    t.equal(doc.text(), 'the ' + plural, singular)
  }
  t.end()
})
