import test from 'tape'
import nlp from './_lib.js'
const here = '[date/durations]'

test('durations vs dates', function (t) {
  let arr = [
    `30mins tuesday`,
    `30 minutes on tuesday`,
    `30 minutes on january 2nd`,
    `tuesday for 30 mins`,
    `january 1st 2020 for 30 mins`,
  ]
  arr.forEach((str) => {
    let doc = nlp(str)
    let dates = doc.dates().get()[0] || {}
    let durations = doc.durations().get()[0] || {}
    t.ok(dates.start, `[date] ${str}`)
    t.equal(durations.minute, 30, `[duration] ${str}`)
  })
  t.end()
})

test('in 4 mins', function (t) {
  let doc = nlp(`in 20 mins`)
  t.equal(doc.dates().found, true, 'in-20 mins Date')
  t.equal(doc.durations().found, false, 'in-20 mins !Duration')

  doc = nlp(`for 20 mins`)
  t.equal(doc.dates().found, false, 'for-20 mins !Date')
  t.equal(doc.durations().found, true, 'for-20 mins Duration')

  doc = nlp(`20 minutes`)
  t.equal(doc.dates().found, false, '20 mins !Date')
  t.equal(doc.durations().found, true, '20 mins Duration')
  t.end()
})

test('durations json', function (t) {
  let doc = nlp('blah blah two hours and 8 mins foobar')
  let json = doc.durations().json()[0]
  t.equal(json.duration.hour, 2, '2 hours')
  t.equal(json.duration.minute, 8, '8 minute')
  t.end()
})

test('one-word durations', function (t) {
  let arr = [
    // ['20m', { minute: 20 }],
    ['20min', { minute: 20 }],
    ['20mins', { minute: 20 }],
    ['10mins', { minute: 10 }],
    ['1min', { minute: 1 }],
    ['1sec', { second: 1 }],
    ['1 sec', { second: 1 }],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])//.tag('Duration')
    let found = doc.durations().get()[0]
    t.deepEqual(found, a[1], here + a[0])
  })
  t.end()
})

// test('durations normalize', function (t) {
//   let arr = [
//     ['blah blah two hours and 8 mins foobar', 'blah blah 2 hours and 8 minutes foobar'],
//     ['seventy-two years', '72 years'],
//     ['12 years and 2 months', '12 years and 2 months'],
//     ['12.3 years', '12.3 years'],
//     ['12 years and one month', '12 years and 1 month'],
//     ['12 yrs and 2 hrs', '12 years and 2 hours'],
//     ['2mins please', '2 minutes please'],
//     ['5yrs and 3 months', '5 years and 3 months'],
//     // ['three quarters', '3 quarters'],
//     // no duration
//     ['food wholesale prices for hours', 'food wholesale prices for hours'],
//   ]
//   arr.forEach((a) => {
//     let doc = nlp(a[0])
//     doc.durations().normalize()
//     t.equal(doc.text(), a[1], a[0])
//   })
//   t.end()
// })
