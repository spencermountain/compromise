import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/named-silent] '

test('capture groups silent by default', function (t) {
  let m = nlp('one two three four five six seven').match('one [two] [three four five] six [seven]')

  t.equal(m.group(0).text(), 'two', here + 'group of 1')
  t.equal(m.group(1).text(), 'three four five', here + 'connected group of 3')
  t.equal(m.group(2).text(), 'seven', here + 'lonely group of 1')

  t.end()
})

// same behaviour as regex capture-groups:
// 'one two three four'.match(/one (?<two>two) three/)
test('capture groups silent by default', function (t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [two] three')
  t.equal(m.text(), 'one two three', here + 'full-response-1')

  m = doc.match('one [two] three [four]')
  t.equal(m.text(), 'one two three four', here + 'full-response-2')
  t.end()
})

test('named groups silent by default', function (t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [<two>two] three')
  t.equal(m.text(), 'one two three', here + 'full-response-named-1')

  m = doc.match('one [two] three [<four>four]')
  t.equal(m.text(), 'one two three four', here + 'full-response-named-2')
  t.end()
})

test('unnamed capture groups found', function (t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [two] three')
  t.equal(m.groups(0).text(), 'two', here + 'unnamed-found-single-0')

  m = doc.match('one [two] three [four]')
  t.equal(m.groups(0).text(), 'two', here + 'unnamed-found-0')
  t.equal(m.groups(1).text(), 'four', here + 'unnamed-found-1')

  let groups = m.groups()
  t.equal(groups[0].text(), 'two', here + 'groups-0')
  t.equal(groups[1].text(), 'four', here + 'groups-1')
  t.equal(groups[2], undefined, here + 'no-group-2')

  t.end()
})

test('capture groups match-shorthand', function (t) {
  let doc = nlp.tokenize('one two three four')
  let m = doc.match('one [two] three', 0)
  t.equal(m.text(), 'two', here + 'match-0')

  m = doc.match('one [two] three [four]')
  t.equal(m.groups(0).text(), 'two', here + 'match-0-two')
  m = doc.match('one [two] three [four]')

  t.equal(m.group(1).text(), 'four', here + 'match-1-two')

  t.end()
})
