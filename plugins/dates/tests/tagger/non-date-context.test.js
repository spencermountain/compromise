import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/tagger/non-date-context] '

test(here + 'no date found', t => {
  const arr = [
    'Version 10.11.12 is installed',
    'Version 1.0.0 is installed',
    'Python 3.11.4 is fast',
    'I live at 12 March Street.',
    'I live at 12 May Street.',
    'I live at 40 April Road.',
    'I live at 12 June Avenue.',
    'I live at 12 January Street.',
    '5 October Drive',
    'It is the third quarter of the game',
    'the final quarter of the match',
    'the second half of the game',
    'a quarter of the pie',
    'one quarter of the pie',
  ]
  arr.forEach(str => {
    const dates = nlp(str).dates()
    t.equal(dates.found, false, here + `no date: '${str}' -> '${dates.text()}'`)
  })
  t.end()
})

test(here + 'date found', t => {
  const arr = [
    ['Born on 10.11.12', '10.11.12'],
    ['on 12.03.1985', '12.03.1985'],
    ['I left on 12 March.', '12 March'],
    ['On 12 March road closures begin.', '12 March'],
    ['the third quarter of 2024', 'third quarter of 2024'],
    ['the third quarter of this year', 'third quarter of this year'],
    ['the first quarter of the year', 'first quarter of the year'],
    ['the third quarter of the fiscal year', 'third quarter'],
    ["the third quarter of the company's fiscal year", 'third quarter'],
    ['in the third quarter', 'third quarter'],
  ]
  arr.forEach(([str, want]) => {
    const dates = nlp(str).dates()
    t.ok(dates.text().includes(want), here + `'${str}' -> '${dates.text()}'`)
  })
  t.end()
})
