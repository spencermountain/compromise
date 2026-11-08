import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/times/meal-times] '

const context = { today: '2026-11-04T10:00:00', timezone: 'Etc/UTC' }

test(here + 'spoken times of day', function (t) {
  const arr = [
    ['breakfast time', '2026-11-04T08:00:00.000Z'],
    ['lunch time', '2026-11-04T12:00:00.000Z'],
    ['lunchtime', '2026-11-04T12:00:00.000Z'],
    ['dinner time', '2026-11-04T18:00:00.000Z'],
    ['dinnertime', '2026-11-04T18:00:00.000Z'],
    ['late night', '2026-11-04T23:00:00.000Z'],
    ['early morning', '2026-11-04T07:00:00.000Z'],
    ['tomorrow at breakfast time', '2026-11-05T08:00:00.000Z'],
    ['friday at lunch time', '2026-11-06T12:00:00.000Z'],
    ['dinner time tomorrow', '2026-11-05T18:00:00.000Z'],
    ['saturday late night', '2026-11-07T23:00:00.000Z'],
    ['tomorrow early morning', '2026-11-05T07:00:00.000Z'],
  ]
  arr.forEach(([str, want]) => {
    const found = nlp(str).dates(context).get()
    t.equal(found.length, 1, str + ': one date')
    t.equal(found[0]?.start, want, str)
  })
  t.end()
})

test(here + 'a meal alone is not a time', function (t) {
  const arr = ['lunch', 'dinner', 'we had a late breakfast']
  arr.forEach(str => {
    t.equal(nlp(str).dates(context).found, false, str)
  })
  t.end()
})
