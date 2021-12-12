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

test('remove-greedy :', function (t) {
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
  // remove the final remaining one
  doc.eq(0).remove()
  t.equal(doc.length, 0, 'no-sentence')
  t.equal(doc.text(), '', 'no-text')
  t.end()
})

test('remove-self :', function (t) {
  const doc = nlp('foo one two. one foo two. one two foo. foo.')
  const res = doc.match('foo').remove()
  const want = 'one two. one two. one two.'
  t.equal(doc.text(), want, here + 'this mutate self')
  t.equal(res.text(), want, here + 'this return mutated')
  t.equal(res.length, 3, here + 'match sentence length')
  t.equal(doc.length, 3, here + 'match original length')
  t.end()
})

test('remove-match:', function (t) {
  const doc = nlp('foo one two. one foo two. one two foo. foo.')
  const res = doc.remove('foo')
  const want = 'one two. one two. one two.'
  t.equal(doc.text(), want, here + 'match mutates self')
  t.equal(res.text(), want, here + 'match returns mutated')
  t.equal(res.length, 3, here + 'match sentence length')
  t.equal(doc.length, 3, here + 'match original length')
  t.end()
})

test('remove-until-empty:', function (t) {
  let doc = nlp(`extra. match.`)
  let m = doc.match('match')
  doc.remove('extra')
  doc.remove(m)
  t.equal(doc.text(), '', here + 'remove empty')

  doc = nlp(`extra. one two.`)
  doc.remove('extra')
  t.equal(doc.text(), 'one two.', here + 'remove empty again')
  t.end()
})

test('remove-is-not-split :', function (t) {
  const doc = nlp('he is really walking. he surely walked quickly, silently.')
  doc.remove('(really|surely|quickly|silently)')
  t.equal(doc.length, 2, here + 'no-split length')
  t.equal(doc.has('is walking'), true, here + 'match over split')
  t.equal(doc.has('he walked'), true, here + 'match over split2')
  t.equal(doc.text(), 'he is walking. he walked.', here + 'remove text')
  t.end()
})

test('clone-safe:', function (t) {
  const txt = 'foo one two. one foo two. one two foo. foo.'
  const doc = nlp(txt)
  const res = doc.clone().remove('foo')
  const want = 'one two. one two. one two.'
  t.equal(doc.text(), txt, here + 'og untouched')
  t.equal(res.text(), want, here + 'match returns mutated')
  t.end()
})

test('clone-partial :', function (t) {
  let doc = nlp(`one two three. four two five`)
  let m = doc.eq(1).clone()
  m.remove('two')
  t.equal(m.match('four five').found, true, here + 'match-over del')
  t.equal(doc.match('four five').found, false, here + 'og no match-over del')
  t.end()
})


test('remove full-sentence', function (t) {
  let doc = nlp(`extra. one two.`)
  doc.remove('extra')
  t.equal(doc.length, 1, here + '1 left')
  t.equal(doc.text(), 'one two.', here + 'kept 2nd sentence')
  t.end()
})

test('remove doc by index :', function (t) {
  let doc = nlp(`one extra two match three`)
  let m = doc.match('match').freeze()
  doc.remove('extra')
  doc.remove(m)
  t.equal(doc.text(), 'one two three', here + 'pointer index')
  t.end()
})



test('remove-everything-basic', function (t) {
  let doc = nlp(`2pm`)
  doc.remove('.')
  t.equal(doc.text(), '', here + 'empty-text')
  t.equal(doc.length, 0, here + '0-length')
  t.equal(doc.found, false, here + 'not-found')

  doc.remove('.')
  t.equal(doc.found, false, here + 'still-not-found')
  t.end()
})

test('remove-reset-some-pointers', function (t) {
  let doc = nlp('one match two three')
  let m = doc.match('match two')
  let dangle = m.match('. .')
  let b = m.remove('two')
  t.equal(m.text(), 'match', 'self updated')
  t.equal(b.text(), 'match', 'returned view updated')
  t.equal(doc.text(), 'one match three', 'document view okay')
  // this pointer is not reset
  t.equal(dangle.text(), 'match three', 'this is off now')
  t.end()
})

test('remove-everything-nested', function (t) {
  let doc = nlp(`see term. term. term after.`)
  t.equal(doc.length, 3, here + 'start-3')

  doc.remove('term')
  t.equal(doc.length, 2, here + 'only-2 now')

  doc.remove('after')
  t.equal(doc.length, 1, here + 'only-1 now')

  doc.remove('.')
  t.equal(doc.length, 0, here + '0 now')
  t.equal(doc.found, false, here + 'not-found')

  doc.remove('.')
  t.equal(doc.found, false, here + 'still-not-found')

  t.end()
})

test('remove-quality-check', function (t) {
  let doc = nlp('match one two. one match two. one two match.')
  doc.remove('match')
  t.equal(doc.text(), 'one two. one two. one two.', 'remove all sides')

  let str = 'match. match match. match match match.'
  doc = nlp(str)
  doc.remove('foobar')
  t.equal(doc.text(), str, 'remove nothing')
  doc.remove('match')
  t.equal(doc.text(), '', 'remove everything')

  doc = nlp('before match after. before match match after. before match match match after.')
  let before = doc.match('before')
  // let after = doc.clone().match('after')
  doc.remove('match+')
  t.equal(doc.text(), 'before after. before after. before after.', 'remove multi-length')
  t.equal(before.text(), 'before before before', 'match before multi-length')
  // t.equal(after.text(), 'after after after', 'match after multi-length')

  t.end()
})