import test from 'tape'
import nlp from './_lib.js'

// Duration ranges
const durArr = [
  {
    text: ['2 to 4 days', '2-4 days', 'two to four days'],
    duration: { years: 0, months: 0, days: 2, hours: 0, minutes: 0 },
  },
  {
    text: ['1 to 2 weeks', '1-2 weeks', 'one to two weeks'],
    duration: { years: 0, months: 0, days: 7, hours: 0, minutes: 0 },
  },
  {
    text: ['1 to 5 months', '1-5 months', 'one to five months'],
    duration: { years: 0, months: 4, days: 0, hours: 0, minutes: 0 },
  },
  {
    text: ['2 to 4 years', '2-4 years', 'two to four years'],
    duration: { years: 2, months: 0, days: 0, hours: 0, minutes: 0 },
  },
]

const context = {
  today: '2024-01-01',
}

test('duration-ranges', function (t) {
  durArr.forEach(obj => {
    obj.text.forEach(text => {
      const doc = nlp(text)
      const duration = doc.dates(context).get()[0].duration
      t.deepEqual(duration, obj.duration, text)
    })
  })
  t.end()
})
