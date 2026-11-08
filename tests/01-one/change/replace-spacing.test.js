import test from 'tape'
import nlp from '../lib.js'
const here = '[one/change/replace-spacing] '

// replacing terms should keep the punctuation after them, as it was
test('replaceWith keeps its following punctuation', function (t) {
  const arr = [
    ['one two - three', 'one two', '12', '12 - three'],
    ['one - three', 'one', '1', '1 - three'],
    ['one two – three', 'one two', '12', '12 – three'],
    ['one two-three', 'one two', '12', '12-three'],
    ['one two, three', 'one two', '12', '12, three'],
    ['one two; three', 'one two', '12', '12; three'],
    ['(one two) three', 'one two', '12', '(12) three'],
    ['one two three', 'one two', '12', '12 three'],
    ['three one two.', 'one two', '12', 'three 12.'],
    ['three one two!', 'one two', '12', 'three 12!'],
  ]
  arr.forEach(([str, match, input, want]) => {
    const doc = nlp(str)
    doc.match(match).replaceWith(input)
    t.equal(doc.text(), want, here + str)
  })
  t.end()
})

test('new punctuation still wins', function (t) {
  const doc = nlp('one two three')
  doc.match('one').replaceWith('zero!')
  t.equal(doc.text(), 'zero! two three', here + 'its own punctuation')
  t.end()
})
