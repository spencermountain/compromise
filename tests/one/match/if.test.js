import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/if] '

test('if-basic:', function (t) {
  let r = nlp('spencer is here')
  let m = r.if('asdf')
  t.equal(m.out('text'), '', here + 'if-negative')

  m = r.if('spencer')
  t.equal(m.out('text'), 'spencer is here', here + 'if-positive')

  r = nlp('spencer is here. john was here.')
  m = r.if('is')
  t.equal(m.out('normal'), 'spencer is here.', here + 'if-partial')

  t.end()
})

test('ifNo:', function (t) {
  let r = nlp('spencer is here')
  let m = r.ifNo('spencer')
  t.equal(m.out('text'), '', here + 'ifNo-positive')

  m = r.ifNo('asdf')
  t.equal(m.out('text'), 'spencer is here', here + 'ifNo-negative')

  r = nlp('spencer is here. john was here.')
  m = r.ifNo('is')
  t.equal(m.out('normal'), 'john was here.', here + 'if-no-partial')

  t.end()
})
