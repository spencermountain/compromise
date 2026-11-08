import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/tagger/may-modal] '

test(here + 'a modal is not part of the date', t => {
  const arr = [
    ['Tomorrow may be better.', 'Tomorrow'],
    ['Monday may be busy.', 'Monday'],
    ['Next week may be better.', 'Next week'],
    ['Tomorrow he may leave.', 'Tomorrow'],
    ['On Monday we may leave.', 'On Monday'],
    ['You may leave tomorrow.', 'tomorrow'],
    ['We may go Monday.', 'Monday'],
    ['It may rain today.', 'today'],
    ['Tomorrow we march on.', 'Tomorrow'],
    ['They march on Monday.', 'on Monday'],
  ]
  arr.forEach(([str, want]) => {
    const dates = nlp(str).dates()
    t.equal(dates.length, 1, here + `one date: '${str}' -> '${dates.text()}'`)
    t.equal(dates.text('reduced'), nlp(want).text('reduced'), here + `only '${want}': '${str}'`)
  })
  t.end()
})

test(here + 'no date found', t => {
  const arr = ['This may not be an easy conversation.', 'as may be necessary', 'These 5 may leave.', '$5 may help.']
  arr.forEach(str => {
    const dates = nlp(str).dates()
    t.equal(dates.found, false, here + `no date: '${str}' -> '${dates.text()}'`)
  })
  t.end()
})

test(here + 'month dates are still found', t => {
  const arr = [
    ['June to march', 'June to march'],
    ['from January through March', 'January through March'],
    ['May this year was hot.', 'May this year'],
    ['may last year', 'may last year'],
    ['March of 2020', 'March of 2020'],
    ['Last May I went home.', 'Last May'],
    ['On 5 May I went home.', '5 May'],
    ['On 12 March we left.', '12 March'],
  ]
  arr.forEach(([str, want]) => {
    const dates = nlp(str).dates()
    t.ok(dates.text().includes(want), here + `'${str}' -> '${dates.text()}'`)
  })
  t.end()
})
