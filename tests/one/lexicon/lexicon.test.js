import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/lexicon] '

test('addWords side-load:', function (t) {
  let lex = {
    bigg: 'Size',
    'bigg apple': 'Town'
  }
  const _nlp = nlp.fork()
  let doc = _nlp('it was bigg')
  t.equal(doc.has('(#Size|#Town)'), false, here + 'none-on-init')

  doc = _nlp('it was bigg', lex)
  t.equal(doc.has('#Size'), true, here + 'single-word')
  doc = _nlp('the bigg apple', lex)
  t.equal(doc.has('#Town'), true, here + 'found-multi-word')
  t.equal(doc.has('#Size'), false, here + 'no-single-word')

  doc = _nlp('it was bigg')
  t.equal(doc.has('#Size'), true, here + 'lex-persists')

  lex = {
    bigg: undefined,
    'bigg apple': undefined
  }
  doc = _nlp('it was bigg', lex)
  t.equal(doc.has('#Size'), false, here + 'lex-removed')
  doc = _nlp('the bigg apple', lex)
  t.equal(doc.has('#Town'), false, here + 'multi-lex-removed')

  t.end()
})

test('lexicon compute:', function (t) {
  let words = {
    'captain obvious': 'Captain'
  }
  let doc = nlp('it was captain obvious', words)
  let m = doc.match('#Captain+')
  t.equal(m.text(), 'captain obvious', here + 'multi-word')
  t.end()
})

test('tricky lexicon:', function (t) {
  let lexicon = {
    'bed bath and beyond': 'Organization',
  }
  const _nlp = nlp.fork()
  let r = _nlp('shopping at Bed Bath and Beyond, the store', lexicon)
  let str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'four-word')

  r = _nlp('shopping at Bed Bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'partially-hyphenated-word')

  r = _nlp('shopping at Bed-bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'many-hyphenated-word')
  t.end()
})