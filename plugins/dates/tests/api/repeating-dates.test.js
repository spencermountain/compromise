import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/api/repeating-dates] '

test(here + 'repeating dates surface in json', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const res = nlp('every tuesday').dates(context).get()
  t.equal(res.length, 1, 'every tuesday found')
  t.ok(res[0].repeat, 'has repeat info')
  t.ok(res[0].repeat.filter.weekDays.tuesday, 'tuesday filter')
  const july = nlp('weekends in july').dates(context).get()[0]
  t.ok(july.repeat && july.repeat.filter.weekDays.saturday, 'weekends in july')
  t.equal(july.start, '2026-07-01T00:00:00.000-04:00', 'july range start')
  t.end()
})
