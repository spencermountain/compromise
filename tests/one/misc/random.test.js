import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/random] '

test('random', function (t) {
  const r = nlp('one two three four five six')
  let arr = r.terms().random().out('array')
  t.equal(arr.length, 1, here + 'default is size 1')

  arr = r.terms().random(2).out('array')
  t.equal(arr.length, 2, here + 'size 2')

  arr = r.terms().random(3).out('array')
  t.equal(arr.length, 3, here + 'size 3')

  arr = r.terms().random(4).out('array')
  t.equal(arr.length, 4, here + 'size 4')

  arr = r.terms().random(5).out('array')
  t.equal(arr.length, 5, here + 'size 5')

  arr = r.terms().random(6).out('array')
  t.equal(arr.length, 6, here + 'size 6')

  arr = r.terms().random(7).out('array')
  t.equal(arr.length, 6, here + '7 is too big')

  arr = r.terms().random(17).out('array')
  t.equal(arr.length, 6, here + '17 is too big')

  t.end()
})

test('random-null', function (t) {
  const r = nlp('toronto')
  let arr = r.match('#Person').random(5).out('array')
  t.equal(arr.length, 0, here + 'random can be empty')

  arr = r.match('toronto+').random(5).out('array')
  t.equal(arr.length, 1, here + 'random can be full-match')
  t.end()
})
