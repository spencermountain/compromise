const test = require('tape')
const nlp = require('./_lib')

test('random', function (t) {
  const r = nlp('one two three four five six')
  let arr = r.terms().random().out('array')
  t.equal(arr.length, 1, 'default is size 1')

  arr = r.terms().random(2).out('array')
  t.equal(arr.length, 2, 'size 2')

  arr = r.terms().random(3).out('array')
  t.equal(arr.length, 3, 'size 3')

  arr = r.terms().random(4).out('array')
  t.equal(arr.length, 4, 'size 4')

  arr = r.terms().random(5).out('array')
  t.equal(arr.length, 5, 'size 5')

  arr = r.terms().random(6).out('array')
  t.equal(arr.length, 6, 'size 6')

  arr = r.terms().random(7).out('array')
  t.equal(arr.length, 6, '7 is too big')

  arr = r.terms().random(17).out('array')
  t.equal(arr.length, 6, '17 is too big')

  t.end()
})

test('random-null', function (t) {
  const r = nlp('toronto')
  let arr = r.match('#Person').random(5).out('array')
  t.equal(arr.length, 0, 'random can be empty')

  arr = r.match('#Place+').random(5).out('array')
  t.equal(arr.length, 1, 'random can be full-match')
  t.end()
})
