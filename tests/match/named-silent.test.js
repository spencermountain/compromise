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

test('unnamed capture groups found', function(t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [two] three')
  t.equal(m.groups(0).text(), 'two', 'unnamed-found-single-0')

  m = doc.match('one [two] three [four]')
  t.equal(m.groups(0).text(), 'two', 'unnamed-found-0')
  t.equal(m.groups(1).text(), 'four', 'unnamed-found-1')

  let groups = m.groups()
  t.equal(groups[0].text(), 'two', 'groups-0')
  t.equal(groups[1].text(), 'four', 'groups-1')
  t.equal(groups[2], undefined, 'no-group-2')

  t.end()
})

test('capture groups match-shorthand', function(t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [two] three', 0)
  t.equal(m.text(), 'two', 'match-0')

  m = doc.match('one [two] three [four]', 0)
  t.equal(m.text(), 'two', 'match-0-two')
  m = doc.match('one [two] three [four]', 1)
  t.equal(m.text(), 'four', 'match-1-two')

  t.end()
})
