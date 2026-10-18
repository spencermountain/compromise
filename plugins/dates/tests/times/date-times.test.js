import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
import { checkEnds, checkEquivalent, checkRanges, checkStarts } from '../_lib/date-assertions.js'
const here = '[dates/times/date-times] '

const february = 1
const march = 2
const april = 3
const may = 4
const july = 6
const september = 8
const october = 9
const december = 11

test(here + 'start dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['2pm', [2016, february, 11]],
    ['2:12', [2016, february, 11]],
    ['2:12am', [2016, february, 11]],
    ['2:12 pm', [2016, february, 11]],
    ['2pm est', [2016, february, 11]],
    ['2pm eastern', [2016, february, 11]],
    ['2pm eastern time', [2016, february, 11]],
    ['2pm pacific standard time', [2016, february, 11]],
    ['march 2nd at 2pm', [2016, march, 2]],
    ['march 2nd at 2pm EST', [2016, march, 2]],
    ['march 2nd at 2pm Eastern standard', [2016, march, 2]],
    ['march 2nd at 2pm Eastern time', [2016, march, 2]],
    ['march 2nd at 2pm Eastern standard time', [2016, march, 2]],
    ['march 2nd at 2pm UTC+5', [2016, march, 2]],
    ['4pm on march 2nd', [2016, march, 2]],
    ['4:32 on march 2nd', [2016, march, 2]],
    ['@ 5pm pacific time march 2nd', [2016, march, 2]],
    ['2 oclock march 2nd', [2016, march, 2]],
    ['march 2nd 2 oclock', [2016, march, 2]],
    ['march 2nd @ 2pm', [2016, march, 2]],
    ['march 2nd @2pm', [2016, march, 2]],
    ['march 2nd @ 2:02', [2016, march, 2]],
    ['march 2nd after 2:00', [2016, march, 2]],
    ['today after 2:00', [2016, february, 11]],
    ['tommorrow before noon', [2016, february, 12]],
    ['july 5th at 2pm', [2016, july, 5]],
    ['july 5th, 2:12', [2016, july, 5]],
    ['4:23am july 5th ', [2016, july, 5]],
    ['july 5th 2pm PST', [2016, july, 5]],
    ['1pm pacific time, july 5th ', [2016, july, 5]],
    ['july 5th before noon pacific time', [2016, july, 5]],
    ['3:23 EST july 5th ', [2016, july, 5]],
    ['2 oclock july 5th ', [2016, july, 5]],
    ['july 5 2016 12 oclock PST', [2016, july, 5]],
    ['3:23 eastern standard time july 5', [2016, july, 5]],
    ['yesterday morning', [2016, february, 10]],
    ['yesterday evening', [2016, february, 10]],
    ['25-12-1999 12:32', [1999, december, 25]],
    ['25-12-1999 12:32:00', [1999, december, 25]],
    ['03/13/2016 at 2:00', [2016, march, 13]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, april, 19], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, april, 19], timezone: 'Canada/Eastern' }
  const rows = [
    ['4pm', [2016, april, 19]],
    // ['2 hours after midnight', [2016, april, 20]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, may, 11], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, may, 11], timezone: 'Canada/Eastern' }
  const rows = [
    ['yesterday morning', [2016, may, 10]],
    ['this wednesday morning', [2016, may, 11]],
    ['next friday evening', [2016, may, 20]],
    ['tomorrow morning', [2016, may, 12]],
    ['tomorrow noon', [2016, may, 12]],
    ['tomorrow afternoon', [2016, may, 12]],
    ['tomorrow evening', [2016, may, 12]],
    ['tomorrow night', [2016, may, 12]],
    ['tomorrow late night', [2016, may, 12]],
    ['tomorrow late at night', [2016, may, 12]],
    ['today morning', [2016, may, 11]],
    ['today afternoon', [2016, may, 11]],
    ['today evening', [2016, may, 11]],
    ['yesterday morning', [2016, may, 10]],
    ['this wednesday afternoon', [2016, may, 11]],
    ['next friday morning', [2016, may, 20]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 28], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 28], timezone: 'Canada/Eastern' }
  const rows = [
    ['saturday morning', [2016, october, 29]],
    ['saturday noon', [2016, october, 29]],
    ['saturday afternoon', [2016, october, 29]],
    ['saturday evening', [2016, october, 29]],
    ['saturday night', [2016, october, 29]],
    ['saturday late night', [2016, october, 29]],
    ['saturday late at night', [2016, october, 29]],
    ['friday morning', [2016, october, 28]],
    ['friday evening', [2016, october, 28]],
    ['sunday morning', [2016, october, 30]],
    ['monday morning', [2016, october, 31]],
    ['this friday morning', [2016, october, 28]],
    ['next monday morning', [2016, october, 31]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2016, october, 4], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2016, october, 4], timezone: 'Canada/Eastern' }
  const rows = [
    ['today morning', [2016, october, 4]],
    ['today afternoon', [2016, october, 4]],
    ['today evening', [2016, october, 4]],
    ['today at noon', [2016, october, 4]],
    ['yesterday afternoon', [2016, october, 3]],
    ['next tuesday morning', [2016, october, 11]],
    ['this tuesday morning', [2016, october, 4]],
    ['next wednesday morning', [2016, october, 12]],
    ['last friday morning', [2016, september, 30]],
    ['this saturday night', [2016, october, 8]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'start dates — ' + JSON.stringify({ today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }), t => {
  const context = { today: [2017, october, 7, 6], timezone: 'Canada/Eastern' }
  const rows = [
    ['tonight', [2017, october, 7]],
    ['this morning', [2017, october, 7]],
    ['this evening', [2017, october, 7]],
    ['this afternoon', [2017, october, 7]],
    ['7pm this afternoon', [2017, october, 7]],
    ['2:00 in the morning', [2017, october, 7]],
    ['2:00pm today', [2017, october, 7]],
    ['5pm this evening', [2017, october, 7]],
    ['tonight at 5pm', [2017, october, 7]],
    ['this evening', [2017, october, 7]],
    ['this morning', [2017, october, 7]],
    //tomorrow
    // ['in the morning', [2017, october, 8]],
    // ['5am in the morning', [2017, october, 8]],
    ['tomorrow in the morning', [2017, october, 8]],
    ['tmrw morning', [2017, october, 8]],
    // ['5 oclock in the morning', [2017, october, 8]],
    ['tomorrow in the afternoon', [2017, october, 8]],
    ['in the evening tomorrow', [2017, october, 8]],
    // ['in the early evening tomorrow', [2017, october, 8]],
    ['yesterday morning', [2017, october, 6]],
    ['yesterday evening', [2017, october, 6]],
    ['yesterday night', [2017, october, 6]],
    ['saturday morning', [2017, october, 7]],
    ['sunday evening', [2017, october, 8]],
    ['monday afternoon', [2017, october, 9]],
    ['noon today', [2017, october, 7]],
  ]
  checkStarts(t, context, rows)
  t.end()
})

test(here + 'inclusive end dates — ' + JSON.stringify({ today: [2016, february, 11], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, february, 11], timezone: 'Canada/Pacific' }
  const rows = [
    ['4:32 on march 2nd', [2016, march, 2]],
    ['at 2 oclock march 2nd', [2016, march, 2]],
    ['on 4:23am july 5th ', [2016, july, 5]],
    ['@ 5pm march 2nd', [2016, march, 2]],
    ['around 1pm pacific time, july 5th', [2016, july, 5]],
    ['on 2pm march 2nd', [2016, march, 2]],
    ['on march 2nd at 2pm', [2016, march, 2]],
    ['on march 2nd @ 2pm', [2016, march, 2]],
    ['on 4pm on march 2nd', [2016, march, 2]],
    ['on 4:32 on march 2nd', [2016, march, 2]],
    ['on 2 oclock march 2nd', [2016, march, 2]],
    ['on march 2nd 2 oclock', [2016, march, 2]],
    ['on 2 oclock july 5th', [2016, july, 5]],
    ['on july 5th 2pm PST', [2016, july, 5]],
    ['on 1pm pacific time, july 5th', [2016, july, 5]],
    ['on july 5th before noon pacific time', [2016, july, 5]],
    ['on july 5 2016 12 oclock PST', [2016, july, 5]],
    ['around 2pm march 2nd', [2016, march, 2]],
    ['around noon on july 5th', [2016, july, 5]],
    ['at 2pm on march 2nd', [2016, march, 2]],
    ['at march 2nd 2pm', [2016, march, 2]],
    ['on around 1pm pacific time, july 5th', [2016, july, 5]],
    ['by march 2nd 2 oclock', [2016, march, 1]],
    ['by march 2nd at 2pm', [2016, march, 1]],
    ['before march 2nd at 2pm', [2016, march, 1]],
    ['before july 5th at 2pm', [2016, july, 4]],
    ['by july 5th, 2:12', [2016, july, 4]],
    ['by september 5th 2pm PST', [2016, september, 4]],
    ['by 4pm on march 2nd', [2016, march, 1]],
    ['by march 2nd @ 2pm', [2016, march, 1]],
    ['before 4pm on march 2nd', [2016, march, 1]],
    ['before march 2nd 2 oclock', [2016, march, 1]],
    ['before july 5th, 2:12', [2016, july, 4]],
  ]
  checkEnds(t, context, rows)
  t.end()
})

test(here + 'equivalent ranges — ' + JSON.stringify({ today: [2016, 10, 23], timezone: 'Canada/Pacific' }), t => {
  const context = { today: [2016, 10, 23], timezone: 'Canada/Pacific' }
  const rows = [
    // ['this morning at 9', 'Nov 23rd @ 9am'],
    ['22-23 Feb at 7pm', 'Feb 22 2017 7pm until Feb 23 2017'],
    // ['22-23 Feb 2016 at 7pm', 'Feb 22 2016 to Feb 23 2016'],
    // ['1994-11-05T13:15:000Z', 'Nov 5 1994 1:15pm'],
  ]
  checkRanges(t, context, rows)
  t.end()
})

test(here + 'equivalent expressions — ' + JSON.stringify({ today: '2020-01-21', timezone: 'Canada/Pacific' }), t => {
  const context = { today: '2020-01-21', timezone: 'Canada/Pacific' }
  const rows = [

    // time
    [`2pm`, '2020-01-21T14:00:00.000-08:00'],
    [`2:12pm`, '2020-01-21T14:12:00.000-08:00'],
    [`2pm eastern time`, '2020-01-21T14:00:00.000-05:00'],
    [`2:12 in the evening`, '2020-01-21T14:12:00.000-08:00'],
    [`02:12:00am`, '2020-01-21T02:12:00.000-08:00'],
    [`2 oclock am`, '2020-01-21T02:00:00.000-08:00'],
    [`noon`, 'today at 12pm'],
    [`at night`, 'today at 8:00pm'],
    // [`in the morning`, 'tomorrow at 8:00pm'],
    [`tomorrow evening`, 'Jan 22 6pm'],
    [`tuesday at 3`, `tuesday 3:00pm`],
    [`tuesday at 4:00`, `tuesday 4:00pm`],
    [`5:30`, `today at 5:30pm`],
    [`tuesday at 3am`, `tuesday 3:00am`],
    [`5 oclock`, `today at 5:00pm`],
    [`5 oclock am`, `today at 5:00am`],
    [`10 oclock`, `today at 10:00am`],
    [`11:30`, `today at 11:30am`],
    [`11:30pm`, `today at 11:30pm`],
    [`tuesday at 1`, `tuesday at 1pm`],

    // time with timezone
    [`2pm Canada/Pacific`, '2020-01-21T14:00:00.000-08:00'],
    [`2pm Canada/Eastern`, '2020-01-21T14:00:00.000-05:00'],
    [`2pm UTC`, '2020-01-21T14:00:00.000+00:00'],

    // additional time
    [`3pm`, '2020-01-21T15:00:00.000-08:00'],
    [`3:30pm`, '2020-01-21T15:30:00.000-08:00'],
    [`3pm eastern time`, '2020-01-21T15:00:00.000-05:00'],
    [`3:30 in the evening`, '2020-01-21T15:30:00.000-08:00'],
    [`03:30:00am`, '2020-01-21T03:30:00.000-08:00'],
    [`3 oclock am`, '2020-01-21T03:00:00.000-08:00'],
    [`midnight`, 'today at 12am'],
    [`in the afternoon`, 'today at 2:00pm'],
    [`in the evening`, 'today at 6:00pm'],
    // [`in the morning`, 'tomorrow at 8:00am'],
    [`tomorrow night`, 'Jan 22 8pm'],
    [`wednesday at 2`, `wednesday 2:00pm`],
    [`wednesday at 3:00`, `wednesday 3:00pm`],
    [`4:30`, `today at 4:30pm`],
    [`wednesday at 3am`, `wednesday 3:00am`],
    [`4 oclock`, `today at 4:00pm`],
    [`6 oclock am`, `today at 6:00am`],
    [`11 oclock`, `today at 11:00am`],
    [`12:30`, `today at 12:30pm`],
    [`12:30am`, `today at 12:30am`],
    [`wednesday at 1`, `wednesday at 1pm`],

    // additional time with timezone
    [`3pm Canada/Pacific`, '2020-01-21T15:00:00.000-08:00'],
    [`3pm Canada/Eastern`, '2020-01-21T15:00:00.000-05:00'],
    [`3pm UTC`, '2020-01-21T15:00:00.000+00:00'],
    [`4pm`, `2020-01-21T16:00:00.000-08:00`],
    [`4:00pm`, `2020-01-21T16:00:00.000-08:00`],
    [`4:00 pm`, `2020-01-21T16:00:00.000-08:00`],
    [`4pm pst`, `2020-01-21T16:00:00.000-08:00`],
    [`4pm pacific time`, `2020-01-21T16:00:00.000-08:00`],
    [`4pm eastern time`, `2020-01-21T16:00:00.000-05:00`],
    [`4pm est`, `2020-01-21T16:00:00.000-05:00`],
    [`4:30 in the afternoon`, `2020-01-21T16:30:00.000-08:00`],
    [`4:30pm`, `2020-01-21T16:30:00.000-08:00`],
    [`04:30:00pm`, `2020-01-21T16:30:00.000-08:00`],
    [`4 oclock pm`, `2020-01-21T16:00:00.000-08:00`],
    [`half past 4`, `2020-01-21T16:30:00.000-08:00`],
    [`quarter past 4`, `2020-01-21T16:15:00.000-08:00`],
    [`6am`, `2020-01-21T06:00:00.000-08:00`],
    [`6:00am`, `2020-01-21T06:00:00.000-08:00`],
    [`8am`, `2020-01-21T08:00:00.000-08:00`],
    [`8:00 in the morning`, `2020-01-21T08:00:00.000-08:00`],
    [`this afternoon`, `today at 2:00pm`],
    [`this evening`, `today at 6:00pm`],
    [`tomorrow afternoon`, `Jan 22 2pm`],
    [`thursday at 4`, `thursday 4:00pm`],
    [`thursday at 4:30`, `thursday 4:30pm`],
    [`friday at 5`, `friday 5:00pm`],
    [`friday at 5am`, `friday 5:00am`],
    [`7 oclock pm`, `today at 7:00pm`],
    [`9:15`, `today at 9:15am`],
    [`9:15am`, `today at 9:15am`],
    [`9:15pm`, `today at 9:15pm`],
    [`4pm Canada/Pacific`, `2020-01-21T16:00:00.000-08:00`],
    [`4pm Canada/Eastern`, `2020-01-21T16:00:00.000-05:00`],
    [`4pm UTC`, `2020-01-21T16:00:00.000+00:00`],
  ]
  checkEquivalent(t, context, rows)
  t.end()
})

test(here + 'spoken clock times — today=2026-09-10T10:00:00, timezone=Etc/UTC', t => {
  const context = { today: '2026-09-10T10:00:00', timezone: 'Etc/UTC' }
  const rows = [
    // 'clock times and spoken times': [
    ['4:00 this afternoon', '2026-09-10T16:00:00'],
    ['today at 4pm', '2026-09-10T16:00:00'],
    ['today at 4 p.m.', '2026-09-10T16:00:00'],
    ['today at four PM', '2026-09-10T16:00:00'],
    ['tomorrow at four in the morning', '2026-09-11T04:00:00'],
    ['today at 16:00', '2026-09-10T16:00:00'],
    ['today at noon', '2026-09-10T12:00:00'],
    ['tomorrow at noon', '2026-09-11T12:00:00'],
    ['tomorrow at 12pm', '2026-09-11T12:00:00'],
    ['tomorrow at 12am', '2026-09-11T00:00:00'],
    ['tonight at 11:59pm', '2026-09-10T23:59:00'],
    ['September 10, 2026 at 8:15am', '2026-09-10T08:15:00'],
    ['at 8:15am on September 10, 2026', '2026-09-10T08:15:00'],
    ['2026-09-10T16:30:00Z', '2026-09-10T16:30:00'],
    ['in an hour', '2026-09-10T11:00:00'],
    ['an hour ago', '2026-09-10T09:00:00'],
    ['in half an hour', '2026-09-10T10:30:00'],
    ['in ninety minutes', '2026-09-10T11:30:00'],
    ['in an hour and a half', '2026-09-10T11:30:00'],
  ]
  rows.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
