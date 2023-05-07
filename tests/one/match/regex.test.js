import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/regex] '

test('prefix/infix/suffix basic', function (t) {
  let r = nlp('it is funny and weird')
  let m = r.match('/nny$/')
  t.equal(m.out('normal'), 'funny', here + 'suffix-match')
  m = r.match('/^fu/')
  t.equal(m.out('normal'), 'funny', here + 'prefix_match')
  m = r.match('/nn/')
  t.equal(m.out('normal'), 'funny', here + 'infix-match')

  m = r.match('/ff$/')
  t.equal(m.out('normal'), '', here + 'no-false-suffix')
  m = r.match('/^ff/')
  t.equal(m.out('normal'), '', here + 'no-false-prefix')
  m = r.match('/ff/')
  t.equal(m.out('normal'), '', here + 'no-false-infix')

  m = r.match('_')
  t.equal(m.out('normal'), '', here + 'no-throw1')
  m = r.match(' _ ')
  t.equal(m.out('normal'), '', here + 'no-throw2')
  m = r.match(' __ ')
  t.equal(m.out('normal'), '', here + 'no-throw3')
  m = r.match(' _ _ ')
  t.equal(m.out('normal'), '', here + 'no-throw4')

  m = r.match('/^w/')
  t.equal(m.out('normal'), 'weird', here + 'one-char-one-word')
  m = r.match('/r/')
  t.equal(m.out('normal'), 'weird', here + 'one-char-one-word2')
  m = r.match('/y$/')
  t.equal(m.out('normal'), 'funny', here + 'one-char-one-word3')

  t.end()
})

test('regex-match:', function (t) {
  let doc = nlp('it is waaaay cool')
  let m = doc.match('/aaa/')
  t.equal(m.out('normal'), 'waaaay', here + 'basic-match')

  m = doc.match('/[ao]{2}/')
  t.equal(m.out('array').length, 2, here + 'trickier-match')

  m = doc.match('is /aaam?/ .')
  t.equal(m.out('normal'), 'is waaaay cool', here + 'trickier-match')

  m = doc.match('(is|was) /a+/ /ool$/')
  t.equal(m.out('normal'), 'is waaaay cool', here + 'even-trickier-match')

  t.end()
})


test('multi-not:', function (t) {
  let doc = nlp('match one two three four five six')
  let m = doc.match('match !(foo|bar){0,3}')
  t.equal(m.text(), 'match one two three', here + 'no-match')

  doc = nlp('match one two bar three four five six')
  m = doc.match('match !(foo|bar){0,3}')
  t.equal(m.text(), 'match one two', here + 'found-match')

  doc = nlp('match foo one two three four')
  m = doc.match('match !(foo|bar){0,3}')
  t.equal(m.text(), '', here + 'no-match')
  t.end()
})