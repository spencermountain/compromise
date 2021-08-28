import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/insert] '

test('insert-basic :', function (t) {
  let m = nlp('the dog sat').insertBefore('and')
  t.equal(m.out('text'), 'and the dog sat', here + 'parent-before')

  m = nlp('the dog sat').insertAfter('patiently')
  t.equal(m.out('text'), 'the dog sat patiently', here + 'parent-after')

  m = nlp('the dog sat')
  m.match('dog').insertBefore('nice')
  t.equal(m.out('text'), 'the nice dog sat', here + 'match-before')

  m = nlp('a dog sat')
  m.match('sat').insertAfter('quickly')
  t.equal(m.out('text'), 'a dog sat quickly', here + 'match-after')

  m = nlp('a dog sat')
  m.match('a dog sat').insertAfter('quickly')
  t.equal(m.out('text'), 'a dog sat quickly', here + 'multi-match-after')

  m = nlp('a dog sat')
  m.match('asdf').insertAfter('no no no')
  t.equal(m.out('text'), 'a dog sat', here + 'insert-multi-after')

  t.end()
})

test('insert-subset-include :', function (t) {
  let m = nlp('the dog is nice')
  let sub = m.match('is')
  sub.insertAfter('really')
  // t.equal(sub.out('normal'), 'is really', here + 'after-parent')
  t.equal(m.out('normal'), 'the dog is really nice', here + 'after-grandparent')

  m = nlp('the dog climbed the fence')
  sub = m.match('climbed')
  sub.insertBefore('really')
  // t.equal(sub.out('normal'), 'really climbed', here + 'before-parent')
  t.equal(m.out('normal'), 'the dog really climbed the fence', here + 'before-grandparent')

  t.end()
})

test('concat pointers :', function (t) {
  let doc = nlp('one two three four')
  let a = doc.match('two three')
  let b = doc.match('three four')
  let res = a.concat(b)
  t.deepEqual(res.out('array'), ['two three', 'three four'], here + 'concat-pointer')

  doc = nlp('one two three. four five six')
  a = doc.match('two three')
  b = doc.match('four .')
  res = a.concat(b)
  t.deepEqual(res.out('array'), ['two three.', 'four five'], here + 'concat-pointer-mixed')
  t.end()
})

test('titlecase change in insertBefore :', function (t) {
  let doc = nlp('walking is very cool')
  doc.match('^.').insertBefore('jogging')
  t.equal(doc.text(), 'jogging walking is very cool', here + 'non-titlecase')

  doc = nlp('Walking is very cool')
  doc.match('^.').insertBefore('jogging')
  t.equal(doc.text(), 'Jogging walking is very cool', here + 'titlecase')

  // doc = nlp('Toronto is very cool', { toronto: 'City' })
  // doc.match('^.').insertBefore('jogging')
  // t.equal(doc.text(), 'Jogging Toronto is very cool', here + 'two-titlecases')

  doc = nlp('I am very cool')
  doc.match('^.').insertBefore('jogging')
  t.equal(doc.text(), 'Jogging I am very cool', here + 'pronoun-titlecase')
  t.end()
})
