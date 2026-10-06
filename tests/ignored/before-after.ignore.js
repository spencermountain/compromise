import test from 'tape'
import nlp from '../one/_lib.js'
const here = '[one/before-after] '

test('before-basic', function (t) {
  let doc = nlp('one two three four five. one three four')
  let arr = doc.before('three four').out('array')
  t.equal(arr.length, 2, 'two-matches')
  t.equal(arr[0], 'one two', 'first-match')
  t.equal(arr[1], 'one', 'second-match')

  doc = nlp('one two three four five. one three four. three four')
  arr = doc.before('three').out('array')
  t.equal(arr.length, 2, here + 'two-matches')
  t.equal(arr[0], 'one two', here + 'first-match')
  t.equal(arr[1], 'one', here + 'second-match')
  t.end()
})

test('before-match:', function (t) {
  let r = nlp('one two three four five').before('two')
  t.equal(r.out('normal'), 'one', here + 'before-two')

  r = nlp('one two three four five').before('three . five')
  t.equal(r.out('normal'), 'one two', here + 'before-several')

  r = nlp('one two three four five').before('one two')
  t.equal(r.out('normal'), '', here + 'no-before-start')

  // r = nlp('one two three four').before('.'); //tricky
  // t.equal(r.out('normal'), '', 'before-any');

  r = nlp('one two three four. No, not here. He said two days a week.').before('two')
  const arr = r.out('array')
  t.equal(arr[0], 'one', here + 'before-twice-1')
  t.equal(arr[1], 'He said', here + 'before-twice-2')

  r = nlp('it was all the way over to two. It was the number two.').before('it')
  t.equal(r.found, false, here + 'no-empty-matches')

  t.end()
})

test('after-match:', function (t) {
  let r = nlp('one two three four five').after('two')
  t.equal(r.out('normal'), 'three four five', here + 'after-one')

  r = nlp('one two three four five').after('one . three')
  t.equal(r.out('normal'), 'four five', here + 'after-several')

  r = nlp('one two three four five').after('four five')
  t.equal(r.out('normal'), '', here + 'no-afters-end')

  r = nlp('one two three four').after('.')
  t.equal(r.out('normal'), 'two three four', here + 'after-any')

  r = nlp('one two three four. No, not here. He said two days a week.').after('two')
  const arr = r.out('array')
  t.equal(arr[0], 'three four.', here + 'after-twice-1')
  t.equal(arr[1], 'days a week.', here + 'after-twice-2')

  r = nlp('all the way over to two. It was the number two.').after('two')
  t.equal(r.found, false, here + 'no-empty-matches')

  t.end()
})
