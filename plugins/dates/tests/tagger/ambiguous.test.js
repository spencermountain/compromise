const test = require('tape')
const nlp = require('../_lib')

test('negative-ambiguous-dates', t => {
  let noDates = [
    'march quickly',
    'quickly march',
    'march to the end',
    'she may go',
    'peter really may ski',
    'make sure the march is planned',
    'go see juliette march against washington',
    'see if april will come to the party',
    'remind june that april is coming',
    'call jan',
    'ask sep to eat bacon',
    'go shopping with april',
    'assign all tasks to april',
    'buy eggs for april',
    'buy eggs for may',
    'buy eggs with may',
    'shop with april',
    'go there with jan',
    'lkjsdf day',
    'day slkj',

    // 'do the 5 day running trip',
    // 'write day 5 of surf diary',
    'day of remembering pinapple',
    'be up-to-date',
    // 'be up-to-day',
    // "remember all of today's laundary",
  ]
  noDates.forEach(str => {
    let found = nlp(str).dates().found
    t.equal(found, false, str)
  })
  t.end()
})

test('positive-ambiguous-dates', t => {
  let yesDates = [
    'go south in march',
    'march in march',
    'this march, go swimming',
    'buy an airplane in june',
    'buy an airplane this may',
    'go swimming in may',
    'go swimming may 2nd',
    'buy a turkey march 3rd',
  ]
  yesDates.forEach(str => {
    let found = nlp(str).dates().found
    t.equal(found, true, str)
  })
  t.end()
})

test('date-tagger', function(t) {
  let arr = [
    ['june 2009', ['Month', 'Year']],
    ['june 5th 2009', ['Month', 'Date', 'Year']],
    ['q2 2009', ['Date', 'Year']],
    ['spring 1980', ['Date', 'Year']],
    ['summer of 1999', ['Date', 'Date', 'Year']],
    ['today', ['Date']],
    ['minute', ['Duration']],
    ['valentines day', ['Holiday', 'Holiday']],
    ['ash wednesday', ['Holiday', 'Holiday']],
  ]
  arr.forEach(function(a) {
    let terms = nlp(a[0]).json(0).terms
    terms.forEach((term, i) => {
      let tag = a[1][i]
      let found = term.tags.some(tg => tg === tag)
      t.equal(found, true, term.text + ' ' + tag)
    })
  })
  t.end()
})
