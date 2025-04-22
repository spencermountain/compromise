import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/prepend] '

test('prepend parent start', function (t) {
  const doc = nlp(`one two three`)
  doc.prepend('zero')
  t.equal(doc.text(), 'zero one two three', here + 'prepended in parent')
  t.end()
})

test('prepend middle', function (t) {
  const doc = nlp(`one two four five`)
  const m = doc.match('four').prepend('three')
  t.equal(m.text().trim(), 'three four', 'prepended in child')
  t.equal(doc.text(), 'one two three four five', here + 'prepended in parent')
  t.end()
})

test('prepend multi', function (t) {
  const doc = nlp('one two. three four')
  doc.prepend('oooo')
  t.equal(doc.text(), 'oooo one two. oooo three four', here + 'prepend-multi')
  t.end()
})

test('prepend children', function (t) {
  const doc = nlp(`one four five six.`)
  const m1 = doc.match('one four')
  const m2 = m1.match('four')
  m2.prepend('two three')

  // t.equal(m1.text(), 'one two three four', 'prepended in child 1')
  t.equal(m2.text(), 'two three four', 'prepended in child 2')
  t.equal(doc.text(), 'one two three four five six.', here + 'prepended in parent')
  t.end()
})

test('prepend start child', function (t) {
  const doc = nlp(`one two three four`)
  doc.match('one').prepend('zero')
  t.equal(doc.text(), 'zero one two three four', here + 'prepended in parent')
  t.end()
})

test('prepend many children', function (t) {
  const doc = nlp(`one two three four`)
  doc.match('one two three').match('one two').match('.').match('one').prepend('zero')
  t.equal(doc.text(), 'zero one two three four', here + 'prepended in parent')
  t.end()
})

test('prepend a doc', function (t) {
  const doc = nlp('one two. three four')
  const one = doc.match('one')
  const four = doc.match('four')
  four.prepend(one)
  t.equal(four.text(), 'one four', here + 'prepend-doc')
  t.end()
})

test('append a doc', function (t) {
  const doc = nlp('one two. three four')
  const one = doc.match('one')
  const four = doc.match('four')
  one.append(four)
  t.equal(one.text(), 'one four', here + 'append-doc')
  t.end()
})
