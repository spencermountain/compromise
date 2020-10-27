const test = require('tape')
const nlp = require('./_lib')

test('whitespace-out', function (t) {
  let str = 'one, two three. One, two, four?'
  const doc = nlp(str)

  t.equal(doc.out(), str, 'original-okay') // ✅

  // some phrases, but full-phrases
  t.equal(doc.eq(0).text(), 'one, two three.', '.eq(0) okay') // ✅
  t.equal(doc.eq(1).text(), 'One, two, four?', '.eq(1) okay') // ✅

  t.equal(doc.match('four').text(), 'four', 'one match') // ✅

  t.equal(doc.match('two').text(), 'two two', 'two single matches') // ✅
  t.equal(doc.match('one').text(), 'one, One', 'two more single matches') // ✅

  t.equal(doc.match('one two').text(), 'one, two One, two', 'two multi-matches') // ✅

  // t.equal(doc.not('two').out(), 'one, three. One, four?', '.not() okay') // ❌

  // t.equal(doc.match('.').out(), str, 'every word') // ❌
  t.end()
})

test('pre/post concat', function (t) {
  let doc = nlp(`Getting ready for whacking day? What's whacking day?`)
  doc.post(' ', true)
  t.equal(doc.text(), `Getting ready for whacking day?  What's whacking day? `)
  // doc.trim()
  // t.equal(doc.text(), `Getting ready for whacking day?  What's whacking day?`)
  t.end()
})
