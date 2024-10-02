import test from 'tape'
import nlp from './_lib.js'

const context = {
  today: '2024-09-24',
}

let arr = [
  { str: 'in 2 to 4 days', start: '2024-09-26', end: '2024-09-28' },
  { str: 'in 2-4 days', start: '2024-09-26', end: '2024-09-28' },
  { str: 'in two to four days', start: '2024-09-26', end: '2024-09-28' },
  { str: '2 to 4 days ago', start: '2024-09-20', end: '2024-09-22' },
  { str: '2-4 days ago', start: '2024-09-20', end: '2024-09-22' },
  { str: 'two to four days ago', start: '2024-09-20', end: '2024-09-22' },

  { str: 'in 1 to 2 weeks', start: '2024-10-01', end: '2024-10-07' },
  { str: 'in 1-2 weeks', start: '2024-10-01', end: '2024-10-07' },
  { str: 'in one to two weeks', start: '2024-10-01', end: '2024-10-07' },
  // { str: '1 to 2 weeks ago', start: '2024-09-10', end: '2024-09-17' },
  // { str: '1-2 weeks ago', start: '2024-09-10', end: '2024-09-17' },
  // { str: 'one to two weeks ago', start: '2024-09-10', end: '2024-09-17' },

  { str: 'in 1 to 5 months', start: '2024-10-24', end: '2025-02-24' },
  { str: 'in 1-5 months', start: '2024-10-24', end: '2025-02-24' },
  { str: 'in one to five months', start: '2024-10-24', end: '2025-02-24' },
  { str: '1 to 5 months ago', start: '2024-04-24', end: '2024-08-24' },
  { str: '1-5 months ago', start: '2024-04-24', end: '2024-08-24' },
  { str: 'one to five months ago', start: '2024-04-24', end: '2024-08-24' },

  { str: 'in 1-2 years', start: '2025-09-24', end: '2026-09-24' },
  { str: 'in 2 to 4 years', start: '2026-09-24', end: '2028-09-24' },
  { str: 'in 2-4 years', start: '2026-09-24', end: '2028-09-24' },
  { str: 'in two to four years', start: '2026-09-24', end: '2028-09-24' },
  { str: '2 to 4 years ago', start: '2020-09-24', end: '2022-09-24' },
  { str: '2-4 years ago', start: '2020-09-24', end: '2022-09-24' },
  { str: 'two to four years ago', start: '2020-09-24', end: '2022-09-24' },
]


test('duration-ranges', function (t) {
  arr.forEach(obj => {
    const doc = nlp(obj.str)
    const { start, end } = doc.dates(context).get()[0]
    t.equal(start.replace(/T.*/, ''), obj.start, obj.str + ':start')
    t.equal(end.replace(/T.*/, ''), obj.end, obj.str + ':end')
  })
  t.end()
})

