const test = require('tape')
const nlp = require('./_lib')

test('known-regions:', function (t) {
  let arr = [
    ['i want to go to Ohio to see George Harrison', 'ohio'],
    ['we are visiting Gloucestershire, before we leave', 'gloucestershire'],
    ['manitoba is nice this time of year', 'manitoba'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).match('#Region').text('normal')
    t.equal(str, a[1], a[0])
  })
  t.end()
})

test('unknown-places:', function (t) {
  let arr = [
    ['live in the Rekcjd Province', 'rekcjd province'],
    ['live in the Lekfjs District', 'lekfjs district'],
    ['visiting Tojbs Kjeh Region', 'tojbs kjeh region'],
    ['visiting the State of Lkjfhe', 'state of lkjfhe'],
    ['see you in West Nunavut', 'west nunavut'],
    ['see you in western Hunan', 'western hunan'],
    ['see you in Northern Hunan province', 'northern hunan province'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0]).places(0).text('normal')
    t.equal(str, a[1], a[0])
  })
  t.end()
})

test('mixed continents-places:', function (t) {
  const doc = nlp('in north africa, eastern asia, guatemala, europe, north america, and japan')
  t.equal(doc.places().length, 6, '6-places')
  t.end()
})
