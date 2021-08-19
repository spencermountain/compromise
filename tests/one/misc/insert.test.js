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