import test from 'tape'
import nlp from '../_lib.js'

test('test first generated-date', function (t) {
  let context = {
    timezone: 'Asia/Kolkata',
    today: '2021-02-16',
    dayStart: '8:00am',
    max_repeat: 5,
  }
  let arr = [
    ['any monday', '2021-02-22T08:00:00.000+05:30'],
    ['every monday in march', '2021-03-01T08:00:00.000+05:30'],
    ['every tuesday in march', '2021-03-02T08:00:00.000+05:30'],
    ['every hour tomorrow', '2021-02-17T08:00:00.000+05:30'],
    ['any month this year', '2021-01-01T08:00:00.000+05:30'],
    ['any month next year', '2022-01-01T08:00:00.000+05:30'],
    ['every thursday at 2pm', '2021-02-18T14:00:00.000+05:30'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let dates = doc.dates(context).get()[0]
    dates.repeat = dates.repeat || {}
    dates.repeat.generated = dates.repeat.generated || []
    t.equal(dates.repeat.generated[0].start, a[1], a[0])
  })
  t.end()
})

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
    ['any monday this year', 52],
    ['any wednesday between 2001 and 2002', 52],
    ['any hour this week', context.max_repeat],
    ['any wednesday', context.max_repeat],
    ['any wednesday this week', 1],
    ['any month this year', 12],
    ['any month next year', 12],
    // ['any minute', context.max_repeat],
    // ['any year in june', 0],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let dates = doc.dates(context).get()[0]
    dates.repeat = dates.repeat || {}
    dates.repeat.generated = dates.repeat.generated || []
    t.equal(dates.repeat.generated.length, a[1], a[0])
  })
  t.end()
})
