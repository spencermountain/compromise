import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[dates/tagger/non-date-expressions] '

test(here + 'non-date expressions — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'avoid greedy non-date interpretations': [
    ['May I help you?', null],
    ['You may leave if you wish.', null],
    ['May the force be with you.', null],
    ['May has three cats.', null],
    ['Theresa May gave a speech.', null],
    ['June Carter sang beautifully.', null],
    ['April is my sister.', null],
    ['March straight ahead.', null],
    ['The soldiers march in formation.', null],
    ['We watched the march for peace.', null],
    ['The March family lives nearby.', null],
    ['Read chapter 12.', null],
    ['There are 31 people here.', null],
    ['I ordered 2026 screws.', null],
    ['The total is $12.50.', null],
    ['The score was 10-12.', null],
    ['The ratio is 3:2.', null],
    ['Add 1/2 cup of flour.', null],
    ['She scored 9/10 on the quiz.', null],
    ['The IP address is 10.10.20.26.', null],
    ['Call 416-555-2026.', null],
    ['Invoice #20260910 is paid.', null],
    ['Use part number 2026-09-10-A.', null],
    ['The password is May2026!', null],
    ['Contact may@example.com.', null],
    ['Visit https://example.com/2026/09/10.', null],
    ['The file is report-2026-09-10.csv.', null],
    ['Take exit 31.', null],
    ['The temperature is -10 degrees.', null],
    ['This weighs 4.30 kilograms.', null],
    ['The journey takes two hours.', null],
    ['She is twenty-one years old.', null],
    ['He finished in second place.', null],
    ['The sun is bright.', null],
    ['She sat by the window.', null],
    ['They wed in a small ceremony.', null],
    ['March Madness is a trademark.', null],
    ['The mayfly landed on the marchioness.', null],
    ['', null],
    ['   ', null],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
