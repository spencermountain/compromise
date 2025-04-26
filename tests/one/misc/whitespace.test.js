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
