const test = require('tape')
const nlp = require('./_lib')

const context = {
  today: '2020-01-21',
  timezone: 'Canada/Pacific',
}

const arr = [
  // explicit-dates
  [`march 2nd`, '2020-03-02T00:00:00.000-08:00'],
  [`2 march`, '2020-03-02T00:00:00.000-08:00'],
  [`tues march 2`, '2020-03-02T00:00:00.000-08:00'],
  [`march the second`, '2020-03-02T00:00:00.000-08:00'],
  [`on the 2nd of march`, '2020-03-02T00:00:00.000-08:00'],

  // numerical-dates
  [`1999/03/02`, 'march 2 1999'],
  [`1999-03-02`, 'march 2 1999'],
  [`03-02-1999`, 'march 2nd 1999'],
  [`03/02`, 'march 2'],
  [`2015.08.13`, 'aug 13 2015'],

  // // named-dates
  [`today`, '2020-01-21'],
  [`now`, 'right now'],
  [`q1`, 'jan 1'],
  [`tomorrow`, '2020-01-22'],

  // // time
  [`2pm`, '2020-01-21T14:00:00.000-08:00'],
  [`2:12pm`, '2020-01-21T14:12:00.000-08:00'],
  [`2pm eastern time`, '2020-01-21T14:00:00.000-05:00'],
  [`2:12 in the evening`, '2020-01-21T14:12:00.000-08:00'],
  [`02:12:00am`, '2020-01-21T02:12:00.000-08:00'],
  [`2 oclock am`, '2020-01-21T02:00:00.000-08:00'],
  [`noon`, 'today at 12pm'],
  [`at night`, 'today at 8:00pm'],
  // [`in the morning`, 'tomorrow at 8:00pm'],
  [`tomorrow evening`, 'Jan 22 6pm'],
  [`aug-20`, '20-aug'],
  [`in a few years`, `in 2 years`],
  [`in a couple years`, `in 2 years`],
  [`2 weeks back`, `2 weeks ago`],
  [`last q1`, `q1 2019`],
  [`last q2`, `q2 2019`],
  [`last q3`, `q3 2019`],
  [`last q4`, `q4 2019`],
  [`this q1`, `q1 2020`],
  [`this q2`, `q2 2020`],
  [`this q3`, `q3 2020`],
  [`this q4`, `q4 2020`],
  [`next q1`, `q1 2021`],
  [`next q2`, `q2 2021`],
  [`next q3`, `q3 2021`],
  [`next q4`, `q4 2021`],
]

test('variety', function (t) {
  arr.forEach((a) => {
    let left = nlp(a[0]).dates(context).json()[0] || {}
    let right = nlp(a[1]).dates(context).json()[0] || {}
    left.date = left.date || {}
    right.date = right.date || {}
    t.equal(left.date.start, right.date.start, a[0])
  })
  t.end()
})
