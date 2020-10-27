const test = require('tape')
const nlp = require('../_lib')

test('contract basic', function (t) {
  let r = nlp(`he is cool.`)
  r.contract()
  t.equal(r.out('text'), `he's cool.`, 'expanded-contract')

  r = nlp(`he's cool.`)
  r.contract()
  t.equal(r.out('text'), `he's cool.`, 'contracted-contract')

  r = nlp(`please do not eat the marshmellow`)
  r.contract()
  t.equal(r.out('text'), `please don't eat the marshmellow`, 'expanded-contract')

  r = nlp(`please don't eat the marshmellow`)
  r.contract()
  t.equal(r.out('text'), `please don't eat the marshmellow`, 'contracted-contract')

  r = nlp(`i have stood`)
  r.contract()
  t.equal(r.out('text'), `i've stood`, 'expanded-contract')

  r = nlp(`i've stood`)
  r.contract()
  t.equal(r.out('text'), `i've stood`, 'contracted-contract')

  r = nlp('i am good')
  r.contract()
  t.equal(r.out('text'), `i'm good`, 'contract-1')
  r.contractions().expand()
  t.equal(r.out('text'), `i am good`, 'expand-2')
  r.contract()
  t.equal(r.out('text'), `i'm good`, 'contract-2')

  r.contractions().contract().contract().contract()
  t.equal(r.out('text'), `i'm good`, 'contract-n')

  t.end()
})

test('avoid contraction messes', function (t) {
  let doc = nlp('Tony, is').contract()
  t.equal(doc.text('reduced'), 'tony is', 'avoid-contraction 1')

  doc = nlp('(Tony) is').contract()
  t.equal(doc.text('reduced'), 'tony is', 'avoid-contraction 2')

  doc = nlp(`'Tony' is`).contract()
  t.equal(doc.text('reduced'), 'tony is', 'avoid-contraction 3')

  doc = nlp('Tony-is').contract()
  t.equal(doc.text('reduced'), 'tony is', 'avoid-contraction 4')

  doc = nlp(`Tony
is`).contract()
  t.equal(doc.text('reduced'), 'tony is', 'avoid-contraction 5')

  t.end()
})
