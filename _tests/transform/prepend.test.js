const test = require('tape')
const nlp = require('../_lib')

test('prepend parent start', function (t) {
  let doc = nlp(`one two three`)
  doc.prepend('zero')
  t.equal(doc.text(), 'zero one two three', 'prepended in parent')
  t.end()
})

test('prepend middle', function (t) {
  let doc = nlp(`one two four five`)
  let m = doc.match('four').prepend('three')
  t.equal(m.text().trim(), 'three four', 'prepended in child')
  t.equal(doc.text(), 'one two three four five', 'prepended in parent')
  t.end()
})

test('prepend multi', function (t) {
  let doc = nlp('one two. three four')
  doc.prepend('oooo')
  t.equal(doc.text(), 'oooo one two. oooo three four')
  t.end()
})

test('prepend children', function (t) {
  let doc = nlp(`one four five six.`)
  let m1 = doc.match('one four')
  let m2 = m1.match('four')
  m2.prepend('two three')

  t.equal(m1.text(), 'one two three four', 'prepended in child 1')
  t.equal(m2.text(), 'two three four', 'prepended in child 2')
  t.equal(doc.text(), 'one two three four five six.', 'prepended in parent')
  t.end()
})

test('prepend start child', function (t) {
  let doc = nlp(`one two three four`)
  doc.match('one').prepend('zero')
  t.equal(doc.text(), 'zero one two three four', 'prepended in parent')
  t.end()
})

test('prepend many children', function (t) {
  let doc = nlp(`one two three four`)
  doc.match('one two three').match('one two').match('.').match('one').prepend('zero')
  t.equal(doc.text(), 'zero one two three four', 'prepended in parent')
  t.end()
})

test('prepend a doc', function (t) {
  let doc = nlp('one two. three four')
  let one = doc.match('one')
  let four = doc.match('four')
  four.prepend(one)
  t.equal(four.text(), 'one four')
  t.end()
})

test('append a doc', function (t) {
  let doc = nlp('one two. three four')
  let one = doc.match('one')
  let four = doc.match('four')
  one.append(four)
  t.equal(one.text(), 'one four')
  t.end()
})
