const test = require('tape')
const nlp = require('../_lib')

test('default lexicon:', function (t) {
  let arr = [
    ['great', 'Adjective'],
    ['walked', 'PastTense'],
    ['singing', 'Gerund'],
    ['funniest', 'Superlative'],
    ['sillier', 'Comparative'],
    ['the', 'Determiner'],
    ['iraqi', 'Demonym'],
    ['december', 'Date'],
    ['fifth', 'Value'],
    ['suddenly', 'Adverb'],
    ['shanghai', 'City'],
    ['google', 'Organization'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    t.equal(doc.has('#' + a[1]), true, a[0])
  })
  t.end()
})

test('root-in-lexicon:', function (t) {
  let arr = [
    ['wash', 'Infinitive'],
    ['rewash', 'Infinitive'],
    ['re-wash', 'Infinitive'],
    ['re-washed', 'PastTense'],
    ['rewashed', 'PastTense'],
    ['rewashes', 'PresentTense'],
    ['rewashing', 'Gerund'],

    ['repurchase', 'Infinitive'],
    ['re-purchase', 'Infinitive'],
    ['unpurchase', 'Infinitive'],
    ['purchased', 'PastTense'],
    ['unpurchasing', 'Gerund'],
    ['unpurchases', 'PresentTense'],
    ['resolve', 'Infinitive'],
    ['restructure', 'Infinitive'],
    ['reconcile', 'Infinitive'],
    ['repeat', 'Infinitive'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    t.equal(doc.has('#' + a[1]), true, a[0])
  })
  t.end()
})

test('adjusted lexicon:', function (t) {
  //place new words
  let lexicon = {
    geneva: 'Person',
    lkjj: 'Adjective',
    'donkey kong': 'City',
  }

  const arr = [
    ['geneva is nice', '#Person #Copula #Adjective'],
    ['he is lkjj', '#Pronoun #Copula #Adjective'],
    ['donkey kong wins the award', '#City #City #Verb #Determiner #Noun'],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0], lexicon)
    t.equal(doc.has(a[1]), true, a[0])
  })
  //
  //set gender from lexicon
  const doc = nlp('Kelly', lexicon)
  t.equal(doc.has('#FemaleName'), true, 'kelly-female')
  //set as male:
  lexicon = {
    kelly: 'MaleName',
  }
  const doc2 = nlp('Kelly', lexicon)
  t.equal(doc2.has('#MaleName'), true, 'kelly-male')

  //gender follows lumping
  const doc3 = nlp('Kelly Gruber', lexicon)
  t.equal(doc3.has('#MaleName #LastName'), true, 'kelly-gruber')

  t.end()
})

test('tricky lexicon:', function (t) {
  let lexicon = {
    'bed bath and beyond': 'Organization',
  }
  let r = nlp('shopping at Bed Bath and Beyond, the store', lexicon)
  let str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', 'four-word')

  r = nlp('shopping at Bed Bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', 'partially-hyphenated-word')

  r = nlp('shopping at Bed-bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', 'many-hyphenated-word')
  t.end()
})
