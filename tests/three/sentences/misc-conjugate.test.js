import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/misc-conjugate] '

test('copula-form', function (t) {
  const m = nlp('john is nice').sentences()

  m.toPastTense()
  t.equal(m.out(), 'john was nice', here + 'toPast-1')

  m.toPresentTense()
  t.equal(m.out(), 'john is nice', here + 'toPres-1')

  m.toFutureTense()
  t.equal(m.out(), 'john will be nice', here + 'toFuture-1')

  m.toNegative()
  t.equal(m.out(), 'john will not be nice', here + 'toNeg-future')

  //negative forms
  m.toPastTense()
  // t.equal(m.out(), 'john was not nice', here + 'toPast-neg')

  m.toPresentTense()
  // t.equal(m.out(), 'john is not nice', here + 'toPres-neg')

  m.toFutureTense()
  t.equal(m.out(), 'john will not be nice', here + 'toFuture-neg')

  t.end()
})

//
test('conjugate-form', function (t) {
  const m = nlp('john walks quickly').sentences()

  m.toPastTense()
  t.equal(m.out(), 'john walked quickly', here + 'toPast-1')

  m.toPresentTense()
  t.equal(m.out(), 'john walks quickly', here + 'toPres-1')

  m.toFutureTense()
  t.equal(m.out(), 'john will walk quickly', here + 'toFuture-1')

  m.toNegative()
  t.equal(m.out(), 'john will not walk quickly', here + 'toNeg')

  //negative forms
  m.toPastTense()
  t.equal(m.out(), 'john did not walk quickly', here + 'toPast-neg')

  m.toPresentTense()
  t.equal(m.out(), 'john does not walk quickly', here + 'toPres-neg')

  m.toFutureTense()
  t.equal(m.out(), 'john will not walk quickly', here + 'toFuture-neg')

  t.end()
})

test('particle-form', function (t) {
  const m = nlp('the stool falls over').sentences()

  m.toPastTense()
  t.equal(m.out(), 'the stool fell over', here + 'toPast-1')

  m.toPresentTense()
  t.equal(m.out(), 'the stool falls over', here + 'toPres-1')

  m.toFutureTense()
  t.equal(m.out(), 'the stool will fall over', here + 'toFuture-1')

  m.toNegative()
  t.equal(m.out(), 'the stool will not fall over', here + 'toNeg')

  //negative forms
  m.toPastTense()
  t.equal(m.out(), 'the stool did not fall over', here + 'toPast-neg')

  m.toPresentTense()
  t.equal(m.out(), 'the stool does not fall over', here + 'toPres-neg')

  m.toFutureTense()
  t.equal(m.out(), 'the stool will not fall over', here + 'toFuture-neg')

  t.end()
})

test('contraction past-tense', function (t) {
  const arr = [
    [`I'm going to the shops`, `I was going to the shops`],
    [`I'll go to the shops`, `I went to the shops`],
    [`We're looking`, `We were looking`],
    [`We are looking`, `We were looking`],
    // [`We are looking`, `We looked`],
    // [`We're looking`, `We looked`],
    [`We'll look`, `We looked`],
  ]
  arr.forEach((a) => {
    const str = nlp(a[0]).sentences().toPastTense().out()
    t.equal(str, a[1], here + 'past-tense ' + a.join(' - '))
  })
  t.end()
})

test('contraction future-tense', function (t) {
  const arr = [
    [`I'm going to the shops`, `I will be going to the shops`],
    [`I'll go to the shops`, `I'll go to the shops`],
    // [`I'm going to the shops`, `I will be going to the shops`],
    // [`I'll go to the shops`, `I will be going to the shops`],
  ]
  arr.forEach((a) => {
    const str = nlp(a[0]).sentences().toFutureTense().out()
    t.equal(str, a[1], here + 'future-tense ' + a.join(' - '))
  })
  t.end()
})

test('contraction present-tense', function (t) {
  const arr = [
    [`I'm going to the shops`, `I'm going to the shops`],
    [`I'm looking for a bug`, `I'm looking for a bug`],
    [`I'll go to the shops`, `I go to the shops`],
    [`I'll look for a bug`, `I look for a bug`],
  ]
  arr.forEach((a) => {
    const str = nlp(a[0]).sentences().toPresentTense().out()
    t.equal(str, a[1], here + 'present-tense ' + a.join(' - '))
  })
  t.end()
})

test('pronoun-specific', function (t) {
  //from present
  let m = nlp('i am cool').sentences().toPresentTense()
  t.equal(m.out(), 'i am cool', here + 'toPresent-I')
  m = nlp('i am cool').sentences().toPastTense()
  t.equal(m.out(), 'i was cool', here + 'toPastTense-I')
  m = nlp('i am cool').sentences().toFutureTense()
  t.equal(m.out(), 'i will be cool', here + 'toFutureTense-I')

  //from future
  m = nlp('i will be cool').sentences().toFutureTense()
  t.equal(m.out(), 'i will be cool', here + 'toFutureTense-I-2')
  m = nlp('i will be cool').sentences().toPastTense()
  t.equal(m.out(), 'i was cool', here + 'toPastTense-I-2')
  m = nlp('i will be cool').sentences().toPresentTense()
  t.equal(m.out(), 'i am cool', here + 'toPresentTense-I-2')

  //from past
  m = nlp('i was cool').sentences().toPresentTense()
  t.equal(m.out(), 'i am cool', here + 'toPresentTense-I-3')
  m = nlp('i was cool').sentences().toPastTense()
  t.equal(m.out(), 'i was cool', here + 'toPastTense-I-3')
  m = nlp('i was cool').sentences().toFutureTense()
  t.equal(m.out(), 'i will be cool', here + 'toFutureTense-I-3')

  //with negative
  m = nlp('i was not cool').sentences().toPresentTense()
  t.equal(m.out(), 'i am not cool', here + 'neg-1')
  m = nlp("i wasn't cool").sentences().toPastTense()
  t.equal(m.out(), "i wasn't cool", here + 'neg-2')
  m = nlp('i was not cool').sentences().toFutureTense()
  t.equal(m.out(), 'i will be not cool', here + 'neg-3')

  //with adverbs
  m = nlp('i was really cool').sentences().toPresentTense()
  t.equal(m.out(), 'i am really cool', here + 'toPresentTense-I-3')
  m = nlp('i was really cool').sentences().toPastTense()
  t.equal(m.out(), 'i was really cool', here + 'toPastTense-I-3')
  m = nlp('i was really cool').sentences().toFutureTense()
  t.equal(m.out(), 'i will be really cool', here + 'toFutureTense-I-3')
  t.end()
})

test('tense-multiple', function (t) {
  let doc = nlp(`he walks down the street and smells the flowers.`)
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'he walked down the street and smelled the flowers.', here + 'to-past')

  doc = nlp(`he walked down the street and smelled the flowers.`)
  doc.sentences().toPresentTense()
  t.equal(doc.text(), 'he walks down the street and smells the flowers.', here + 'to-pres')

  // past
  doc = nlp(`he walked down the street and smelled the flowers.`)
  doc.sentences().toFutureTense()
  t.equal(doc.text(), 'he will walk down the street and smell the flowers.', here + 'past-1')
  // past-two
  doc = nlp(`he walks down the street and smells the flowers.`)
  doc.sentences().toFutureTense()
  t.equal(doc.text(), 'he will walk down the street and smell the flowers.', here + 'past-2')
  t.end()
})