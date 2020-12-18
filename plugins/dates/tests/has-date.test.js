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
    // timezone
    `9 eastern time`,
    `9am est`,
    `9am peru time`,
    `9am GMT+9`,

    // relative duration
    `this march`,
    `this week`,
    `this sunday`,
    `next april`,
    `this past year`,
    `second week of march`,
    `last weekend of march`,
    `last spring`,
    `the saturday after next`,

    // punt
    `two days after tomorrow`,
    `in seven weeks`,
    `2 weeks from now`,
    `2 weeks after`,
    `2 years 4 months 5 days ago`,
    `a week friday`,
    `a week and a half before`,
    `on the 1st`,

    // start/end
    `end of the week`,
    `start of next year`,
    `start of next year`,
    `middle of q2 last year`,
    `09.08.2013`,
    `13h30`,
    'last quarter',
  ]
  arr.forEach(function (str) {
    const doc = nlp(str)
    t.equal(doc.dates().length, 1, str)
  })
  t.end()
})
