const test = require('tape')
const nlp = require('./_lib')

const arr = [
  // explicit-dates
  [`march 2nd`, '2020-03-02T00:00:00.000Z'],
  [`2 march`, '2020-03-02T00:00:00.000Z'],
  [`tues march 2`, '2020-03-02T00:00:00.000Z'],
  // [`march the second`, '2020-03-02T00:00:00.000Z'],
  // [`on the 2nd`, '2020-02-02T00:00:00.000Z'],

  // numerical-dates
  // [`1999/03/02`, ''],
  // [`1999-03-02`, ''],
  // [`03-02-1999`, ''],
  // [`03/02`, ''],
  // [`2015.08.13`, ''],

  // // named-dates
  // [`today`, ''],
  // [`easter`, ''],
  // [`q1`, ''],
  // [`tomorrow`, ''],

  // // time
  // [`2pm`, ''],
  // [`2:12pm`, ''],
  // [`2:12`, ''],
  // [`02:12:00`, ''],
  // [`2 oclock`, ''],
  // [`before 1`, ''],
  // [`noon`, ''],
  // [`at night`, ''],
  // [`in the morning`, ''],
  // [`tomorrow evening`, ''],

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

const context = {
  today: '2020-01-21',
}

test('variety', function(t) {
  arr.forEach(a => {
    if (!a[1]) {
      return //skip
    }
    let doc = nlp(a[0])
    let json = doc.dates(context).json()[0]
    t.equal(json.date.start, a[1], a[0])
  })
  t.end()
})
