import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/contract] '

test('contract basic', function (t) {
  let r = nlp(`he is cool.`)
  r.contract()
  t.equal(r.out('text'), `he's cool.`, here + 'expanded-contract')

  r = nlp(`he's cool.`)
  r.contract()
  t.equal(r.out('text'), `he's cool.`, here + 'contracted-contract')

  r = nlp(`please do not eat the marshmellow`)
  r.contract()
  t.equal(r.out('text'), `please don't eat the marshmellow`, here + 'expanded-contract')

  r = nlp(`please don't eat the marshmellow`)
  r.contract()
  t.equal(r.out('text'), `please don't eat the marshmellow`, here + 'contracted-contract')

  r = nlp(`i have stood`)
  r.contract()
  t.equal(r.out('text'), `i've stood`, here + 'expanded-contract')

  r = nlp(`i've stood`)
  r.contract()
  t.equal(r.out('text'), `i've stood`, here + 'contracted-contract')

  r = nlp('i am good')
  r.contract()
  t.equal(r.out('text'), `i'm good`, here + 'contract-1')
  r.contractions().expand()
  t.equal(r.out('text'), `i am good`, here + 'expand-2')
  r.contract()
  t.equal(r.out('text'), `i'm good`, here + 'contract-2')

  r.contractions().contract().contract().contract()
  t.equal(r.out('text'), `i'm good`, here + 'contract-n')

  t.end()
})

test('avoid contraction messes', function (t) {
  let doc = nlp('Tony, is').contract()
  t.equal(doc.has('is'), true, here + 'avoid-contraction 1')

  doc = nlp('(Tony) is').contract()
  t.equal(doc.has('is'), true, here + 'avoid-contraction 2')

  doc = nlp(`'Tony' is`).contract()
  t.equal(doc.has('is'), true, here + 'avoid-contraction 3')

  doc = nlp('Tony-is').contract()
  t.equal(doc.has('is'), true, here + 'avoid-contraction 4')
  let str = `Tony
is`
  doc = nlp(str).contract()
  t.equal(doc.has('is'), true, here + 'avoid-contraction 5')

  t.end()
})

test('multiple contraction in sentence', function (t) {
  let doc = nlp(`he's foo she's`)
  t.equal(doc.terms().length, 5, here + 'multi-contraction-count')
  t.equal(doc.has('he is foo she is'), true, here + 'multi-contraction-order')

  doc = nlp(`he's she's`)
  t.equal(doc.terms().length, 4, here + 'multi-contraction-count-2')
  t.equal(doc.has('he is she is'), true, here + 'multi-contraction-order-2')

  doc = nlp(`he's dead, he's dead`)
  t.equal(doc.match('he is dead').length, 2, here + 'multi-contraction-count')
  t.end()
})
