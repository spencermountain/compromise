import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/min-max] '

test('match min-max', function (t) {
  let doc = nlp('hello1 one hello2').match('#Value{7,9}')
  t.equal(doc.out(), '', here + 'match was too short')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3}')
  t.equal(doc.out(), 'one two three', here + 'exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,3}')
  t.equal(doc.out(), 'one two three', here + 'still exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,}')
  t.equal(doc.out(), 'one two three four five', here + 'minimum three')

  doc = nlp('hello1 one two three four five hello2').match('hello1 .{3}')
  t.equal(doc.out(), 'hello1 one two three', here + 'unspecific greedy exact length')

  doc = nlp('hello1 one two').match('hello1 .{3}')
  t.equal(doc.out(), '', here + 'unspecific greedy not long enough')

  t.end()
})

test('min-max with 0', function (t) {
  const arr = [
    ['he got a car for christmas', 'a car'],
    ['a car', 'a car'],
    ['a really cool car', 'a really cool car'],
    ['he got a cool car for christmas', 'a cool car'],
    ['he got a really cool car for christmas', 'a really cool car'],
    ['he got a really cool fast car for christmas', 'a really cool fast car'],
    ['he got a really super cool fast car for christmas', ''],
    // test false-negatives
    ['he got a hat for christmas', ''],
    ['he got a clever hat for christmas', ''],
    ['he got a clever nice cool warm hat for christmas', ''],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    const m = doc.match('a .{0,3} car')
    t.equal(m.text(), a[1], here + a[0])
  })

  const doc = nlp('got a car')
  let m = doc.match('a .{0,3}? car')
  t.equal(m.text(), 'a car', here + 'with-question-mark')

  m = doc.match('a .{0,3} car')
  t.equal(m.text(), 'a car', here + 'without-question-mark')

  t.end()
})
