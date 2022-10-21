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
  t.equal(res.text(), '', here + 'this return mutated')
  t.equal(res.length, 0, here + 'match sentence length')
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
  let m = doc.match('match')
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
  t.equal(doc.text(), 'one two. one two. one two.', here + 'remove all sides')

  let str = 'match. match match. match match match.'
  doc = nlp(str)
  doc.remove('foobar')
  t.equal(doc.text(), str, here + 'remove nothing')
  doc.remove('match')
  t.equal(doc.text(), '', here + 'remove everything')

  doc = nlp('before match after. before match match after. before match match match after.')
  let before = doc.match('before')
  // let after = doc.clone().match('after')
  doc.remove('match+')
  t.equal(doc.text(), 'before after. before after. before after.', here + 'remove multi-length')
  t.equal(before.text(), 'before before before', here + 'match before multi-length')
  // t.equal(after.text(), 'after after after', 'match after multi-length')

  t.end()
})

test('remove-bug-1', function (t) {
  let m = nlp('one two three. foo.')
  m = m.splitOn('two')
  t.equal(m.docs.length, 4, here + 'four-parts')
  t.equal(m.ptrs.length, 4, here + 'four-ptrs')
  m.remove('three')
  t.equal(m.docs.length, 3, here + 'now-three-parts')
  t.equal(m.ptrs.length, 3, here + 'now-three-ptrs')
  t.end()
})


// weird remove issue
test('remove-bug-2', function (t) {
  let doc = nlp('two three')
  let arr = doc.splitAfter('two')
  arr.remove('three') // works
  t.deepEqual(arr.out('array'), ['two'], here + 'remove match')
  t.deepEqual(doc.out('array'), ['two'], here + 'doc remove match')

  doc = nlp('two three')
  arr = doc.splitAfter('two')
  let m = doc.match('three')
  m.remove()
  t.deepEqual(m.json(), [], here + 'self is gone')
  t.deepEqual(arr.out('array'), ['two'], here + 'remove self')
  t.deepEqual(doc.out('array'), ['two'], here + 'doc remove self')

  t.end()
})


test('remove-bug-3', function (t) {
  let txt = `
Header: 
single

Header:
first
second
`
  let doc = nlp(txt)
  let m = doc.match('Header')
  doc.remove(m)
  t.deepEqual(doc.out('array'), ['single', 'first', 'second'], here + 'multi-remove issue')
  t.end()
})

test('remove-with-contractions', function (t) {
  let doc = nlp(`before Remove 500mg of paracetamol`)
  doc.remove('Remove')
  t.equal(doc.text(), 'before 500mg of paracetamol', here + 'remove before contraction')

  doc = nlp(`before 500mg Remove of paracetamol`)
  doc.remove('Remove')
  t.equal(doc.text(), 'before 500mg of paracetamol', here + 'remove after contraction')

  doc = nlp(`before 500mg Remove of paracetamol`)
  doc.remove('500mg remove')
  t.equal(doc.text(), 'before of paracetamol', here + 'remove with contraction')

  doc = nlp(`before i've had paracetamol`)
  doc.remove(`i've`)
  t.equal(doc.text(), 'before had paracetamol', here + 'remove only contraction')
  t.end()
})

// test('remove-self-keep-splits', function (t) {
//   let m = nlp('one two three. four.')
//   m = m.terms()
//   // [one, two, three, four]
//   m = m.match('three').remove()
//   // [one, two, four]
//   t.deepEqual(m.out('array'), ['one', 'two.', 'four'])
//   t.end()
// })

test('remove-keep-splits', function (t) {
  let m = nlp('one two three. four.')
  m = m.terms()
  // [one, two, three, four]
  m = m.remove('three')
  // [one, two, four]
  t.deepEqual(m.out('array'), ['one', 'two.', 'four.'], here + 'keep-splits')
  t.end()
})


test('double-self becomes empty', function (t) {
  let txt = `zero foo. one match foo. two foo.`
  let doc = nlp(txt)
  doc.harden()
  let m = doc.eq(1)
  m.remove()
  t.equal(m.found, false, here + 'remove self is empty')

  t.end()
})

test('double-remove', function (t) {
  let txt = `zero foo. one match foo. two foo.`
  let doc = nlp(txt)
  doc.remove('match') // first removal
  doc.remove('zero foo') //second removal
  t.equal(doc.text(), 'one foo. two foo.', here + 'double remove #1')

  doc = nlp(txt)
  doc.remove('match') // first removal
  doc.eq(0).remove() //second removal
  t.equal(doc.text(), 'one foo. two foo.', here + 'double remove #2')

  t.end()
})

test('full-to-full', function (t) {
  const text = `Remove me 1:
  - A some text
  - B some text
  - C some text`
  let doc = nlp(text)
  doc.remove('Remove me #NumericValue')
  doc.match('text').prepend('prefix')

  const want = `- A some prefix text
  - B some prefix text
  - C some prefix text`
  t.equal(doc.text(), want, here + 'full-to-full')
  t.end()
})