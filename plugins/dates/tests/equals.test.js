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
  // [`2015.08.13`, 'aug 17 2015'],

  // // named-dates
  [`today`, '2020-01-21'],
  [`now`, 'right now'],
  // [`easter`, ''],
  [`q1`, 'jan 1'],
  [`tomorrow`, '2020-01-22'],

  // // time
  // [`2pm`, '2020-01-21T14:00:00.000-08:00'],
  // [`2:12pm`, '2020-01-21T14:12:00.000-08:00'],
  // [`2pm eastern time`, '2020-01-21T14:00:00.000-05:00'],
  // [`2:12`, ''],
  // [`02:12:00`, ''],
  // [`2 oclock`, ''],
  // [`before 1`, ''],
  [`noon`, 'today at 12pm'],
  [`at night`, 'today at 8:00pm'],
  // [`in the morning`, ''],
  [`tomorrow evening`, 'Jan 22 6pm'],

  // // timezone
  // [`eastern time`, ''],
  // [`est`, ''],
  // [`peru time`, ''],
  // [`GMT+9`, ''],

  // // relative duration
  // [`this march`, ''],
  // [`this week`, ''],
  // [`this sunday`, ''],
  // [`next april`, ''],
  // [`this past year`, ''],
  // [`second week of march`, ''],
  // [`last weekend of march`, ''],
  // [`last spring`, ''],
  // [`the saturday after next`, ''],

  // // punt
  // [`two days after tomorrow`, ''],
  // [`in seven weeks`, ''],
  // [`2 weeks from now`, ''],
  // [`2 weeks after`, ''],
  // [`2 years 4 months 5 days ago`, ''],
  // [`a week friday`, ''],
  // [`a week and a half before`, ''],
  // [`on the 1st`, ''],

  // // start/end
  // [`end of the week`, ''],
  // [`start of next year`, ''],
  // [`start of next year`, ''],
  // [`middle of q2 last year`, ''],
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
