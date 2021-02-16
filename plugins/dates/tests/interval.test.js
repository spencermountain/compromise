const test = require('tape')
const nlp = require('./_lib')

test('count generated dates', function (t) {
  let context = {
    timezone: 'Asia/Kolkata',
    today: '2000-01-01',
    max_repeat: 65,
  }
  let arr = [
    ['every day in march', 31],
    ['every monday in march', 4],
    ['every hour in June 5th', 24],
    // ['every week before jan 2021', 52],
    ['any monday this year', 52],
    ['any wednesday between 2001 and 2002', 52],
    ['any hour this week', context.max_repeat],
    ['any wednesday', context.max_repeat],
    // ['any minute', context.max_repeat],
    // ['any year in june', 0],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let dates = doc.dates(context).get(0)
    t.equal(dates.repeat.generated.length, a[1], a[0])
  })
  t.end()
})
