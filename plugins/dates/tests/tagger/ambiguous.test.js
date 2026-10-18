import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/tagger/ambiguous] '

test(here + 'negative-ambiguous-dates', t => {
  const noDates = [
    'march quickly',
    'quickly march',
    'march to the end',
    'she may go',
    'peter really may ski',
    'make sure the march is planned',
    'go see juliette march against washington',
    'see if april will come to the party',
    // 'remind june that april is coming',
    // 'call jan',
    // 'ask sep to eat bacon',
    'go shopping with april',
    // 'assign all tasks to april',
    // 'buy eggs for april',
    // 'buy eggs for may',
    // 'buy eggs with may',
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
    const found = nlp(str).dates().found
    t.equal(found, false, str)
  })
  t.end()
})

test(here + 'positive-ambiguous-dates', t => {
  const yesDates = [
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
    const found = nlp(str).dates().found
    t.equal(found, true, str)
  })
  t.end()
})

test(here + 'date-tagger', function (t) {
  const arr = [
    ['june 2009', ['Month', 'Year']],
    ['june 5th 2009', ['Month', 'Date', 'Year']],
    ['q2 2009', ['Date', 'Year']],
    // ['spring 1980', ['Date', 'Year']],
    ['summer of 1999', ['Date', 'Date', 'Year']],
    ['today', ['Date']],
    ['minute', ['Duration']],
    ['valentines day', ['Holiday', 'Holiday']],
    ['ash wednesday', ['Holiday', 'Holiday']],
  ]
  arr.forEach(function (a) {
    const terms = nlp(a[0]).json()[0].terms
    terms.forEach((term, i) => {
      const tag = a[1][i]
      const found = term.tags.some(tg => tg === tag)
      t.equal(found, true, term.text + ' ' + tag)
    })
  })
  t.end()
})

test(here + 'march/may as verbs', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const getStart = (str, ctx = context) => {
    const res = nlp(str).dates(ctx).get()[0]
    return res ? res.start : null
  }
  t.equal(getStart('the soldiers march tomorrow'), '2026-07-12T00:00:00.000-04:00', 'march tomorrow → tomorrow')
  t.equal(getStart('you may tomorrow find peace'), '2026-07-12T00:00:00.000-04:00', 'may tomorrow → tomorrow')
  t.equal(getStart('may 2020'), '2020-05-01T00:00:00.000-04:00', 'may 2020 still works')
  t.equal(getStart('march 5th'), '2027-03-05T00:00:00.000-05:00', 'march 5th still works')
  t.end()
})
