import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/remove] '

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
