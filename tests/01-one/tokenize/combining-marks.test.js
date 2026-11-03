import test from 'tape'
import nlp from '../lib.js'

const here = '[one/tokenize/combining-marks] '

test('combining marks stay with their base letter', t => {
  const words = ['Poincare\u0301', 'E\u0300\u0304', 'cafe\u0301', 'A\u{1D165}']
  words.forEach(word => {
    const doc = nlp(`"${word},"`)
    const term = doc.json({ offset: true })[0].terms[0]
    t.equal(term.text, word, here + 'original word')
    t.equal(term.pre, '"', here + 'opening punctuation')
    t.equal(term.post, ',"', here + 'closing punctuation')
    t.equal(term.offset.length, word.length, here + 'UTF-16 offset length')
    t.equal(doc.text(), `"${word},"`, here + 'original input preserved')
  })
  t.end()
})

test('unattached marks and symbol modifiers remain outside the word', t => {
  const cases = [
    ['word!\u0301', 'word', '', '!\u0301'],
    ['hi❤️', 'hi', '', '❤️'],
    ['\u0301word', 'word', '\u0301', ''],
    ['Poincare\u0301!\u0301', 'Poincare\u0301', '', '!\u0301'],
  ]
  cases.forEach(([input, text, pre, post]) => {
    const term = nlp(input).json()[0].terms[0]
    t.deepEqual([term.text, term.pre, term.post], [text, pre, post], here + input)
  })
  t.end()
})
