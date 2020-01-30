const test = require('tape')
const nlp = require('../_lib')

// same behaviour as regex capture-groups:
// 'one two three four'.match(/one (?<two>two) three/)
test('capture groups silent by default', function(t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [two] three')
  t.equal(m.text(), 'one two three', 'full-response-1')

  m = doc.match('one [two] three [four]')
  t.equal(m.text(), 'one two three four', 'full-response-2')
  t.end()
})

test('named groups silent by default', function(t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [<two>two] three')
  t.equal(m.text(), 'one two three', 'full-response-named-1')

  m = doc.match('one [two] three [<four>four]')
  t.equal(m.text(), 'one two three four', 'full-response-named-2')
  t.end()
})
