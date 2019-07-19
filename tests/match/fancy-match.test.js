var test = require('tape')
var nlp = require('../_lib')

test('matchOne', function(t) {
  let doc = nlp('one two three four five. one three four')
  let arr = doc.matchOne('three four').out('array')
  t.test(arr.length, 1, 'one-match')
  t.test(arr[0], 'three four', 'found-match')
  t.end()
})

test('match-from-array :', function(t) {
  var m = nlp('spencer is really cool').match(['spencer'])
  t.equal(m.out('normal'), 'spencer', 'just-spencer')
  t.equal(m.length, 1, 'one-result')

  m = nlp('spencer is really cool').match([])
  t.equal(m.out('normal'), '', 'empty match')
  t.equal(m.length, 0, 'zero-results')

  m = nlp('spencer is really cool')
  var r = m.match(['spencer', 'really']).toUpperCase()
  t.equal(r.out('text'), 'SPENCER REALLY', 'match-spencer-really')
  t.equal(r.length, 2, 'two-results')

  t.equal(m.out('text'), 'SPENCER is REALLY cool', 'match-spencer-really')
  t.equal(m.length, 1, 'still-one-result')
  t.end()
})
