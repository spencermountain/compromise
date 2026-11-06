import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/tagger/verb-and-modifier-context] '

test(here + 'a generic time of day is not a date', t => {
  const arr = [
    'A good morning routine helps',
    'My morning routine helps',
    'an evening class',
    'a morning flight',
    'his afternoon nap',
  ]
  arr.forEach(str => {
    const dates = nlp(str).dates()
    t.equal(dates.found, false, here + `no date: '${str}' -> '${dates.text()}'`)
  })
  t.end()
})

test(here + 'a specific time of day is a date', t => {
  const arr = [
    ['this morning', 'this morning'],
    ['tomorrow morning', 'tomorrow morning'],
    ['Monday morning meeting', 'Monday morning'],
    ['I run in the morning', 'in the morning'],
    ['this morning routine', 'this morning'],
  ]
  arr.forEach(([str, want]) => {
    const dates = nlp(str).dates()
    t.ok(dates.text().includes(want), here + `'${str}' -> '${dates.text()}'`)
  })
  t.end()
})

test(here + 'march as a verb is not part of the date', t => {
  const arr = [
    ['They march to Monday.', 'Monday'],
    ['They march until Monday.', 'Monday'],
    ['The soldiers march through Monday.', 'Monday'],
    ['They march 5 miles on Monday.', 'Monday'],
  ]
  arr.forEach(([str, want]) => {
    const text = nlp(str).dates().text()
    t.ok(text.includes(want), here + `found: '${str}' -> '${text}'`)
    t.notOk(/march/i.test(text), here + `no march: '${str}' -> '${text}'`)
  })
  t.end()
})

test(here + 'month ranges and dates after a plural still parse', t => {
  const arr = [
    ['March to June', 'March to June'],
    ['from may to june', 'may to june'],
    ['Results March to May', 'March to May'],
    ['Elections May 5', 'May 5'],
    ['Sales March 2020', 'March 2020'],
  ]
  arr.forEach(([str, want]) => {
    const text = nlp(str).dates().text()
    t.ok(text.includes(want), here + `'${str}' -> '${text}'`)
  })
  t.end()
})
