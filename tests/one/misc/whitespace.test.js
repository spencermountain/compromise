import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/whitespace] '

test('whitespace-out', function (t) {
  const str = 'one, two three. One, two, four?'
  const doc = nlp(str)

  t.equal(doc.out(), str, here + 'original-okay')

  // some phrases, but full-phrases
  t.equal(doc.eq(0).text(), 'one, two three.', here + '.eq(0) okay')
  t.equal(doc.eq(1).text(), 'One, two, four?', here + '.eq(1) okay')

  t.equal(doc.match('four').text(), 'four', here + 'one match')

  t.equal(doc.match('two').text(), 'two two', here + 'two single matches')
  t.equal(doc.match('one').text(), 'one, One,', here + 'two more single matches')

  t.equal(doc.match('one two').text(), 'one, two One, two,', here + 'two multi-matches')

  // t.equal(doc.not('two').out(), 'one, three. One, four?', '.not() okay') // ❌

  // t.equal(doc.match('.').out(), str, 'every word') // ❌
  t.end()
})

test('pre/post concat', function (t) {
  const doc = nlp(`Getting ready for whacking day? What's whacking day?`)
  doc.post(' ', true)
  t.equal(doc.text(), `Getting ready for whacking day?  What's whacking day? `, here + 'concat')
  doc.trim()
  t.equal(doc.text(), `Getting ready for whacking day?  What's whacking day?`)
  t.end()
})

test('preserve non-breaking spaces', function (t) {
  const inputs = [
    'one\u00a0two\u00a0three.',
    'One sentence.\u00a0Next sentence.',
    '\u00a0one\u00a0two\u00a0',
    'I .\u00a0.\u00a0. maybe.',
    '「はい。」\u00a0「いいえ。」',
    'one\ttwo three.',
  ]
  inputs.forEach(str => {
    const doc = nlp(str)
    const ascii = nlp(str.replace(/\u00a0/g, ' '))
    t.equal(doc.text(), str, here + 'preserve original whitespace')
    t.deepEqual(
      doc.out('array').map(s => s.replace(/\u00a0/g, ' ')),
      ascii.out('array'),
      here + 'same sentence boundaries'
    )
  })
  t.end()
})

test('non-breaking space terms and offsets', function (t) {
  const str = '\u00a0One\u00a0two.\u00a0Three\u00a0four.\u00a0'
  const doc = nlp(str)
  const json = doc.json({ offset: true })
  t.deepEqual(json.map(s => s.text), ['One\u00a0two.', 'Three\u00a0four.'], here + 'sentence text')
  t.deepEqual(json.map(s => s.offset), [
    { index: 0, start: 1, length: 8 },
    { index: 2, start: 10, length: 11 },
  ], here + 'sentence offsets')
  t.deepEqual(json.map(s => s.terms.map(term => term.index)), [
    [[0, 0], [0, 1]],
    [[1, 0], [1, 1]],
  ], here + 'term indices')
  t.equal(doc.match('three four').text(), 'Three\u00a0four.', here + 'match across non-breaking space')
  t.equal(nlp('old\u00a0in').text('normal'), 'old in', here + 'explicit normalized output')
  t.equal(nlp('Miami, FL\u00a033178').has('fl 33178'), true, here + 'split non-breaking space')
  t.end()
})
