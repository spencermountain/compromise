import test from 'tape'
import nlp from '../_lib.js'

test('prefix/infix/suffix basic', function (t) {
  let r = nlp('it is funny and weird')
  let m = r.match('/nny$/')
  t.equal(m.out('normal'), 'funny', 'suffix-match')
  m = r.match('/^fu/')
  t.equal(m.out('normal'), 'funny', 'prefix_match')
  m = r.match('/nn/')
  t.equal(m.out('normal'), 'funny', 'infix-match')

  m = r.match('/ff$/')
  t.equal(m.out('normal'), '', 'no-false-suffix')
  m = r.match('/^ff/')
  t.equal(m.out('normal'), '', 'no-false-prefix')
  m = r.match('/ff/')
  t.equal(m.out('normal'), '', 'no-false-infix')

  m = r.match('_')
  t.equal(m.out('normal'), '', 'no-throw1')
  m = r.match(' _ ')
  t.equal(m.out('normal'), '', 'no-throw2')
  m = r.match(' __ ')
  t.equal(m.out('normal'), '', 'no-throw3')
  m = r.match(' _ _ ')
  t.equal(m.out('normal'), '', 'no-throw4')

  m = r.match('/^w/')
  t.equal(m.out('normal'), 'weird', 'one-char-one-word')
  m = r.match('/r/')
  t.equal(m.out('normal'), 'weird', 'one-char-one-word2')
  m = r.match('/y$/')
  t.equal(m.out('normal'), 'funny', 'one-char-one-word3')

  t.end()
})

test('regex-match:', function (t) {
  let doc = nlp('it is waaaay cool')
  let m = doc.match('/aaa/')
  t.equal(m.out('normal'), 'waaaay', 'basic-match')

  m = doc.match('/[ao]{2}/')
  t.equal(m.out('array').length, 2, 'trickier-match')

  m = doc.match('is /aaam?/ .')
  t.equal(m.out('normal'), 'is waaaay cool', 'trickier-match')

  m = doc.match('(is|was) /a+/ /ool$/')
  t.equal(m.out('normal'), 'is waaaay cool', 'even-trickier-match')

  t.end()
})
