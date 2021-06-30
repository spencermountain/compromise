const test = require('tape')
const nlp = require('../_lib')

test('basic is contractions', function (t) {
  let r = nlp(`he is cool.`)
  r.contractions().expand()
  t.equal(r.out('text'), `he is cool.`, 'expanded-expand')

  r = nlp(`he's cool.`)
  r.contractions().expand()
  t.equal(r.out('text'), `he is cool.`, 'contracted-expand')

  r = nlp(`he ain't going`)
  r.contractions().expand()
  t.equal(r.out('text'), `he is not going`, 'aint')

  r = nlp(`that's really great.`)
  r.contractions().expand()
  t.equal(r.out('text'), `that is really great.`, 'contracted-expand')

  r = nlp(`she'll, eat icecream`)
  r.contractions().expand()
  t.equal(r.out('text'), `she will, eat icecream`, 'with-punctuation')

  r = nlp("we're not gonna take it, no we're not gonna take it")
  r.contractions().expand()
  t.equal(r.out('text'), `we are not going to take it, no we are not going to take it`, 'expand gonna twice')

  r = nlp("we're we're gonna gonna")
  r.contractions().expand()
  t.equal(r.out('text'), `we are we are going to going to`, 'expand consecutive')
  t.end()
})

test('do-not contractions', function (t) {
  let r = nlp(`please do not eat the marshmellow`)
  r.contractions().expand()
  t.equal(r.out('text'), `please do not eat the marshmellow`, 'expanded-expand')

  r = nlp(`please don't eat the marshmellow`)
  r.contractions().expand()
  t.equal(r.out('text'), `please do not eat the marshmellow`, 'contracted-expand')

  t.end()
})

test('have contractions', function (t) {
  let r = nlp(`i have stood`)
  r.contractions().expand()
  t.equal(r.out('text'), `i have stood`, 'expanded-expand')

  r = nlp(`i've stood`)
  r.contractions().expand()
  t.equal(r.out('text'), `i have stood`, 'contracted-expand')

  t.end()
})

test('repeated contract-expand', function (t) {
  let r = nlp(`i'm good`)
  r.contractions().expand()

  r.contractions().expand().expand().expand()
  t.equal(r.out('text'), `i am good`, 'expand-n')
  t.end()
})

test('contracted', function (t) {
  let r = nlp(`I'll go to Toronto. I will see.`)
  let m = r.contractions()
  let str = m.out('text')
  t.equal(str, `I'll`, 'contracted')

  t.equal(m.length, 1, 'no-expanded')
  t.end()
})

test('would-or-did', function (t) {
  let r = nlp(`i'd contemplate`)
  let str = r.contractions().expand().all().out('text')
  t.equal(str, `i would contemplate`, 'i-would')

  r = nlp(`i'd contemplated`)
  str = r.contractions().expand().all().out('text')
  t.equal(str, `i had contemplated`, 'i-had')
  t.end()
})
