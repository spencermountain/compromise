import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/negative] '

test('! negative match syntax :', function (t) {
  let doc = nlp.tokenize('one two three')
  let m = doc.match('one !two three')
  t.equal(m.text(), '', here + 'ban-not')

  doc = nlp.tokenize('one two three')
  m = doc.match('one !foo three')
  t.equal(m.text(), 'one two three', here + 'swap-not')

  doc = nlp.tokenize('one two three')
  m = doc.match('one !foo? two three')
  t.equal(m.text(), 'one two three', here + 'optional-not-missing')


  doc = nlp("before bar")
  m = doc.match("before !foo?")
  t.equal(m.text(), 'before bar', here + 'optional-not-end')

  doc = nlp("before")
  m = doc.match("before !foo?")
  t.equal(m.text(), 'before', here + 'optional-not-end-missing')

  m = "i will !foo .{0,9}? send"
  doc = nlp("i will then send him")
  t.equal(doc.has(m), true, here + 'neg1')

  doc = nlp("before bar after")
  m = doc.match("before !foo? after")
  t.equal(m.text(), 'before bar after', here + 'optional-not-found')

  m = "i will !foo? send"
  doc = nlp("I will then send him")
  t.equal(doc.has(m), true, here + 'neg4')

  m = "i will !foo{0,9}? send"
  doc = nlp("I will then send him")
  t.equal(doc.has(m), true, here + 'neg5')

  m = "i will !."
  doc = nlp("I will then send him") //never negative anything
  t.equal(doc.has(m), false, here + 'neg-anything')

  // m = "i will !not? .{0,9}? send"
  // doc = nlp("i will send him")
  // t.equal(doc.has(m), true, here + 'neg-optional')

  // m = "i will !foo? !foo? !foo? !foo? !foo?  send"
  // doc = nlp("I will send her.")
  // t.equal(doc.has(m), true, here + 'multi-optional')

  t.end()
})

test('negative optional logic', function (t) {
  let doc = nlp.tokenize(`one after`)
  let m = doc.match(`one !foo? moo? after`)
  t.equal(m.text(), 'one after', here + 'optional-after')

  m = doc.match(`one !foo? after`)
  t.equal(m.text(), 'one after', here + 'not-optional-after')

  doc = nlp(`I have not booked`)

  // -make sure we do not find 'not'
  m = doc.match(`have !not? booked`)
  t.equal(m.found, false, here + 'neg-missing')

  // make sure we do not find 'not'
  // but with tricky next-term greedy
  m = doc.match(`have !not? * booked`)
  t.equal(m.found, false, here + 'neg-then-astrix')

  t.end()
})

test('negative greedy-max', function (t) {
  const check = (doc) => doc.has('before !(not|no|maybe|perhaps){0,3} after')

  let doc = nlp('before after')
  t.equal(check(doc), true, 'no middle')

  doc = nlp('before one after')
  t.equal(check(doc), true, 'one middle')

  doc = nlp('before one two after')
  t.equal(check(doc), true, 'two middle')

  doc = nlp('before one two three after')
  t.equal(check(doc), true, 'three middle')

  doc = nlp('before one two three four after')
  t.equal(check(doc), false, 'four middle')

  doc = nlp('before one two three maybe')
  let m = doc.match('before !maybe{1}')
  t.equal(m.text(), 'before one', 'greedy-max-one')

  doc = nlp('before one two three maybe')
  m = doc.match('before !maybe{1,2}')
  t.equal(m.text(), 'before one two', 'greedy-max-two')

  doc = nlp('before one two three maybe')
  m = doc.match('before !maybe{4,5}')
  t.equal(m.text(), '', 'greedy-unmet-min')

  t.end()
})

test('negative greedy-end', function (t) {
  // simpler version
  let doc = nlp('before one after')
  t.equal(doc.has('before !maybe+ after'), true, 'greedy-not-one')

  doc = nlp('before one two after')
  t.equal(doc.has('before !maybe+ after'), true, 'greedy-not-two')

  // greedyEnd
  doc = nlp('before one two')
  let m = doc.match('before !maybe+')
  t.equal(m.text(), 'before one two', 'greedy-end')

  doc = nlp('before maybe')
  m = doc.match('before !maybe+')
  t.equal(m.text(), '', 'greedy-zero-fail')

  doc = nlp('before one maybe')
  m = doc.match('before !maybe+')
  t.equal(m.text(), 'before one', 'greedy-one-stop')

  doc = nlp('before one two maybe')
  m = doc.match('before !maybe+')
  t.equal(m.text(), 'before one two', 'greedy-two-stop')
  t.end()
})


test('negative greedy-to', function (t) {
  let doc = nlp('before one after end')
  let m = doc.match('before !maybe+ after')
  t.equal(m.text(), 'before one after', 'greedy-to-pos')

  doc = nlp('before one after end')
  m = doc.match('before !maybe+ none')
  t.equal(m.text(), '', 'greedy-no-after')
  t.end()
})
