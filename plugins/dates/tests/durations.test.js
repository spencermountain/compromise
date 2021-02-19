const test = require('tape')
const nlp = require('./_lib')

test('durations json', function (t) {
  let doc = nlp('blah blah two hours and 8 mins foobar')
  let json = doc.durations().json(0)
  t.equal(json.duration.hour, 2, '2 hours')
  t.equal(json.duration.minute, 8, '8 minute')
  t.end()
})

test('durations normalize', function (t) {
  let arr = [
    ['blah blah two hours and 8 mins foobar', 'blah blah 2 hours and 8 minutes foobar'],
    ['seventy-two years', '72 years'],
    ['12 years and 2 months', '12 years and 2 months'],
    ['12.3 years', '12.3 years'],
    ['12 years and one month', '12 years and 1 month'],
    ['12 yrs and 2 hrs', '12 years and 2 hours'],
    ['2mins please', '2 minutes please'],
    ['5yrs and 3 months', '5 years and 3 months'],
    // ['three quarters', '3 quarters'],
    // no duration
    ['food wholesale prices for hours', 'food wholesale prices for hours'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.durations().normalize()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
