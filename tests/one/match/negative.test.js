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

  m = "i will !not .{0,9}? send"
  doc = nlp("i will then send him")
  t.equal(doc.has(m), true, here + 'neg1')

  m = "i will !not? .{0,9}? send"
  doc = nlp("i will send him")
  t.equal(doc.has(m), true, here + 'neg-optional')

  m = "i will !not? !not? !not? !not? !not? !not? !not? !not? !not? send"
  doc = nlp("I will send her.")
  t.equal(doc.has(m), true, here + 'multi-optional')

  doc = nlp("before bar after")
  m = doc.match("before !foo? after")
  t.equal(m.text(), 'before bar after', here + 'optional-not-found')

  m = "i will !not? send"
  doc = nlp("I will then send him") //this works as a negative but not a positive"
  t.equal(doc.has(m), true, here + 'neg4')

  m = "i will !not{0,9}? send"
  doc = nlp("I will then send him") //this does not work with a word between will and send",
  t.equal(doc.has(m), true, here + 'neg5')

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
