const test = require('tape')
const nlp = require('../_lib')

test('before-basic', function(t) {
  let doc = nlp('one two three four five. one three four')
  let arr = doc.before('three four').out('array')
  t.equal(arr.length, 2, 'two-matches')
  t.equal(arr[0], 'one two', 'first-match')
  t.equal(arr[1], 'one', 'second-match')

  doc = nlp('one two three four five. one three four. three four')
  arr = doc.before('three').out('array')
  t.equal(arr.length, 2, 'two-matches')
  t.equal(arr[0], 'one two', 'first-match')
  t.equal(arr[1], 'one', 'second-match')
  t.end()
})

test('before-match:', function(t) {
  let r = nlp('one two three four five').before('two')
  t.equal(r.out('normal'), 'one', 'before-two')

  r = nlp('one two three four five').before('three . five')
  t.equal(r.out('normal'), 'one two', 'before-several')

  r = nlp('one two three four five').before('one two')
  t.equal(r.out('normal'), '', 'no-before-start')

  // r = nlp('one two three four').before('.'); //tricky
  // t.equal(r.out('normal'), '', 'before-any');

  r = nlp('one two three four. No, not here. He said two days a week.').before('two')
  let arr = r.out('array')
  t.equal(arr[0], 'one', 'before-twice-1')
  t.equal(arr[1], 'He said', 'before-twice-2')

  r = nlp('it was all the way over to two. It was the number two.').before('it')
  t.equal(r.found, false, 'no-empty-matches')

  t.end()
})

test('after-match:', function(t) {
  let r = nlp('one two three four five').after('two')
  t.equal(r.out('normal'), 'three four five', 'after-one')

  r = nlp('one two three four five').after('one . three')
  t.equal(r.out('normal'), 'four five', 'after-several')

  r = nlp('one two three four five').after('four five')
  t.equal(r.out('normal'), '', 'no-afters-end')

  r = nlp('one two three four').after('.')
  t.equal(r.out('normal'), 'two three four', 'after-any')

  r = nlp('one two three four. No, not here. He said two days a week.').after('two')
  let arr = r.out('array')
  t.equal(arr[0], 'three four.', 'after-twice-1')
  t.equal(arr[1], 'days a week.', 'after-twice-2')

  r = nlp('all the way over to two. It was the number two.').after('two')
  t.equal(r.found, false, 'no-empty-matches')

  t.end()
})
