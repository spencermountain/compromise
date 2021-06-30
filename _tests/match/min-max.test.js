const test = require('tape')
const nlp = require('../_lib')

test('match min-max', function (t) {
  let doc = nlp('hello1 one hello2').match('#Value{7,9}')
  t.equal(doc.out(), '', 'match was too short')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3}')
  t.equal(doc.out(), 'one two three', 'exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,3}')
  t.equal(doc.out(), 'one two three', 'still exactly three')

  doc = nlp('hello1 one two three four five hello2').match('#Value{3,}')
  t.equal(doc.out(), 'one two three four five', 'minimum three')

  doc = nlp('hello1 one two three four five hello2').match('hello1 .{3}')
  t.equal(doc.out(), 'hello1 one two three', 'unspecific greedy exact length')

  doc = nlp('hello1 one two').match('hello1 .{3}')
  t.equal(doc.out(), '', 'unspecific greedy not long enough')

  t.end()
})

test('min-max with 0', function (t) {
  let arr = [
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
    let doc = nlp(a[0])
    let m = doc.match('a .{0,3} car')
    t.equal(m.text(), a[1], a[0])
  })

  let doc = nlp('got a car')
  let m = doc.match('a .{0,3}? car')
  t.equal(m.text(), 'a car', 'with-question-mark')

  m = doc.match('a .{0,3} car')
  t.equal(m.text(), 'a car', 'without-question-mark')

  t.end()
})
