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
  t.equal(m.text(), 'one two three', here + 'skip-not')

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
