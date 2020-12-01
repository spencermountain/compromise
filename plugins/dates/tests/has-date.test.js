const test = require('tape')
const nlp = require('./_lib')

test('has a date', function (t) {
  let arr = [
    'July 13 through 15',
    `this minute`,
    '1 hour ago',
    '5 days ago',
    '8:00 p.m. February 11',
    '5pm on may 27th',
    '2 weekends ago',
    'jan 3 2010 at 4',
    `11:00 at night`,
    `4:00 in the evening`,
    'midday February 11',
    'this evening',
    'this day',
    '6 months hence',
    'tues',
    `2012-06`,
    '1 fortnight ago',
    `1:00:00 PM`,
    'first monday of january',
    `3rd month next year`,
    `3 in the morning`,
    `12:15PM`,
    `in a few years`,
    `in a couple years`,
    `in 2 years`,
    `this morning at 7:30`,
    `this evening at 7:30`,
    `before 1999`,
    `2 weeks back`,
    `eom`,
    `eod`,
    `eoy`,
    'next q4',
    `last yr`,
    `a quarter past 4`,
    '13:45',
    '22 sept',
    `may '97`,
    `Thu 16th`,
  ]
  arr.forEach(function (str) {
    const doc = nlp(str)
    t.equal(doc.dates().length, 1, str)
  })
  t.end()
})
