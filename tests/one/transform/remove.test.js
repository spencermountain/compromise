import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/remove] '

test('remove-basic :', function (t) {
  let m = nlp('the brown cat played').match('brown').remove().all()
  t.equal(m.out('text'), 'the cat played', here + 'brown-cat')

  m = nlp('the nice brown cat played').match('nice brown').remove().all()
  t.equal(m.out('text'), 'the cat played', 'nice-brown')

  m = nlp('the nice brown cat played').match('(nice|brown|cute)').remove().all()
  t.equal(m.out('text'), 'the cat played', 'adj-each')

  m = nlp('the nice brown cat played').match('(nice|brown)+').remove().all()
  t.equal(m.out('text'), 'the cat played', 'adj-consecutive')

  t.end()
})

test('remove-match :', function (t) {
  let m = nlp('the brown cat played').remove('brown')
  t.equal(m.out('text'), 'the cat played', 'brown-cat')

  m = nlp('the brown cat played. The brown dog sat down.').remove('brown')
  t.equal(m.out('text'), 'the cat played. The dog sat down.', 'brown-cat')

  m = nlp('the nice brown cat played. The nice dog waited.').remove('nice brown')
  t.equal(m.out('text'), 'the cat played. The nice dog waited.', 'nice-brown')

  m = nlp('the nice brown cat played. The cute dogs ate.').remove('(nice|brown|cute)')
  t.equal(m.out('text'), 'the cat played. The dogs ate.', 'adj-each')

  m = nlp('the nice brown cat played. The cute dogs ate.').remove('(nice|brown|cute)+')
  t.equal(m.out('text'), 'the cat played. The dogs ate.', 'adj-consecutive')

  t.end()
})

test('remove-logic :', function (t) {
  let m = nlp('spencer kelly is here').match('spencer kelly').remove('spencer')
  t.equal(m.out('normal'), 'kelly', 'remove(reg) returns this')

  m = nlp('spencer kelly is here').match('spencer kelly').remove().all()
  t.equal(m.out('normal'), 'is here', 'remove() returns parent')

  m = nlp('spencer kelly is here').match('spencer kelly').remove('notfound')
  t.equal(m.out('normal'), 'spencer kelly', 'remove(notfound) returns this')
  t.end()
})

test('remove-dangling :', function (t) {
  let doc = nlp(`one two three. four five six`)
  doc.eq(0).remove()
  t.equal(doc.length, 1, 'one-sentence')
  t.equal(doc.text(), 'four five six', 'full-sentence')
  t.end()
})
