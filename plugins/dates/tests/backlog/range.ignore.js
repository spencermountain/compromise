const test = require('tape')
const spacetime = require('spacetime')
const nlp = require('../_lib')

test('never allow end > start', t => {
  let context = {
    today: 'january 5 2018',
  }
  let arr = ['eat eggs june 5th to june 7th', 'eat eggs june 5th to 7th', 'eat eggs june 7th to june 5th']
  arr.forEach(str => {
    let json = nlp(str)
      .dates(context)
      .json()
    let start = spacetime(json.date.start)
    let end = spacetime(json.date.end)
    t.equal(start.isBefore(end), true, str)
  })
  t.end()
})
