import test from 'tape'
import nlp from '../_lib.js'
import checkDate from '../_date-fixture.js'
const here = '[plugins/dates/missing-forms] '

const context = {
  today: '2026-09-10T10:00:00',
  timezone: 'Etc/UTC',
}
// Expectations, not snapshots of parser output. Thursday, September 10, 2026.
// [text, start, optional end]; null means no date should be extracted.
// Date-only values compare calendar days; timestamps compare through seconds.
// Ends are inclusive. Omitted/undefined ends are unchecked; null ends must be null.
// Each positive row expects exactly one result; a missing start expectation is invalid.
// Policy proposals: future bare dates; Monday weeks; next weekday = following week;
// last weekday = most recent occurrence. Explicit past tense overrides future bias.
// Fuzzy months: early 1–14, mid 10–20, late 21–last; halves split after the 15th.
// Dayparts: morning 06–12, afternoon 12–17, evening 17–21, night 21–next 06.
// These boundaries are deliberately reviewable, not universal linguistic facts.
const arr = [
  // 'calendar spellings'
  ['september tenth twenty twenty-six', '2026-09-10'],
  ['September the tenth, two thousand and twenty-six', '2026-09-10'],

  // 'relative days and weekdays': [
  ['in twenty-one days', '2026-10-01'],
  ['this coming Friday', '2026-09-11'],
  ['last Wednesday', '2026-09-09'],
  ['Friday of next week', '2026-09-18'],
  ['not this Saturday but the Saturday after', '2026-09-19'],

  // 'calendar periods'
  ['the week after next', '2026-09-21', '2026-09-27'],
  ['the weekend after next', '2026-09-19', '2026-09-20'],
  ['the month after next', '2026-11-01', '2026-11-30'],
  ['the first half of 2027', '2027-01-01', '2027-06-30'],
  ['the second half of 2027', '2027-07-01', '2027-12-31'],

  // Northern meteorological seasons, inclusive final calendar day.
  ['spring 2027', '2027-03-01', '2027-05-31'],
  ['summer 2027', '2027-06-01', '2027-08-31'],
  ['autumn 2026', '2026-09-01', '2026-11-30'],
  ['fall 2026', '2026-09-01', '2026-11-30'],
  ['winter 2026', '2026-12-01', '2027-02-28'],

  // positions within a calendar
  ['the penultimate day of September 2026', '2026-09-29'],
  ['the second to last Friday of September 2026', '2026-09-18'],
  ['the Friday after September 14, 2026', '2026-09-18'],
  ['the Monday before September 10, 2026', '2026-09-07'],

  // Business days exclude weekends only; no locale-specific holiday calendar.
  ['one business day from today', '2026-09-11'],
  ['two business days from today', '2026-09-14'],
  ['five working days from today', '2026-09-17'],
  ['the last business day of October 2026', '2026-10-30'],

  // 'soft ranges and approximate language
  ['early this June', '2027-06-01', '2027-06-14'],
  ['early June 2027', '2027-06-01', '2027-06-14'],
  ['in early June 2027', '2027-06-01', '2027-06-14'],
  ['mid-June 2027', '2027-06-10', '2027-06-20'],
  ['the middle of June 2027', '2027-06-10', '2027-06-20'],
  ['late June 2027', '2027-06-21', '2027-06-30'],
  ['towards the end of June 2027', '2027-06-21', '2027-06-30'],
  ['early next month', '2026-10-01', '2026-10-14'],
  ['mid next month', '2026-10-10', '2026-10-20'],
  ['late next month', '2026-10-21', '2026-10-31'],
  ['late February 2028', '2028-02-21', '2028-02-29'],
  ['late February 2027', '2027-02-21', '2027-02-28'],
  ['the first half of June 2027', '2027-06-01', '2027-06-15'],
  ['the second half of June 2027', '2027-06-16', '2027-06-30'],
  ['the second half of July 2027', '2027-07-16', '2027-07-31'],
  ['early to mid June 2027', '2027-06-01', '2027-06-20'],
  ['mid to late June 2027', '2027-06-10', '2027-06-30'],
  ['late June to early July 2027', '2027-06-21', '2027-07-14'],

  // Approximate points retain their stated center; no invented tolerance.

  // 'explicit date ranges'
  ['between September 10 and September 12, 2026', '2026-09-10', '2026-09-12'],
  ['10–12 September 2026', '2026-09-10', '2026-09-12'],
  ['the tenth through the twelfth of September 2026', '2026-09-10', '2026-09-12'],
  ['between October and December 2026', '2026-10-01', '2026-12-31'],
  ['June 1, 2027 to the end of that month', '2027-06-01', '2027-06-30'],
  ['September 10, 2026 for three days', '2026-09-10', '2026-09-12'],

  // 'clock times and spoken times': [
  ["four o'clock this afternoon", '2026-09-10T16:00:00'],
  ['tomorrow at four in the afternoon', '2026-09-11T16:00:00'],
  ['today at 16:05:30', '2026-09-10T16:05:30'],
  ['tomorrow at 00:00', '2026-09-11T00:00:00'],
  ['at the start of tomorrow at midnight', '2026-09-11T00:00:00'],
  ['today at half past four in the afternoon', '2026-09-10T16:30:00'],
  ['today at a quarter past four in the afternoon', '2026-09-10T16:15:00'],
  ['today at quarter to five in the afternoon', '2026-09-10T16:45:00'],
  ['tomorrow at ten past nine in the morning', '2026-09-11T09:10:00'],
  ['tomorrow at twenty to ten in the morning', '2026-09-11T09:40:00'],
  ['tomorrow at five thirty in the evening', '2026-09-11T17:30:00'],
  ['tomorrow at nine oh five in the morning', '2026-09-11T09:05:00'],
  ['tomorrow at 0900 hours', '2026-09-11T09:00:00'],
  ['tonight at 2100 hours', '2026-09-10T21:00:00'],
  ['now', '2026-09-10T10:00:00'],
  ['right now', '2026-09-10T10:00:00'],
  ['in two hours and fifteen minutes', '2026-09-10T12:15:00'],
  ['in thirty seconds', '2026-09-10T10:00:30'],
  ['forty-five minutes ago', '2026-09-10T09:15:00'],
  ['in twenty-six hours', '2026-09-11T12:00:00'],
  ['in thirty-six hours', '2026-09-11T22:00:00'],

  // 'time ranges and dayparts'
  ['today from noon to 1:30pm', '2026-09-10T12:00:00', '2026-09-10T13:30:00'],
  ['September 30 at 11pm to October 1 at 2am', '2026-09-30T23:00:00', '2026-10-01T02:00:00'],
  ['December 31, 2026 at 11pm to January 1, 2027 at 1am', '2026-12-31T23:00:00', '2027-01-01T01:00:00'],
  ['tomorrow at 2pm for two hours', '2026-09-11T14:00:00', '2026-09-11T16:00:00'],
  ['tomorrow at 2pm for ninety minutes', '2026-09-11T14:00:00', '2026-09-11T15:30:00'],
  ['this morning', '2026-09-10T06:00:00', '2026-09-10T12:00:00'],
  ['this afternoon', '2026-09-10T12:00:00', '2026-09-10T17:00:00'],
  ['this evening', '2026-09-10T17:00:00', '2026-09-10T21:00:00'],
  ['tonight', '2026-09-10T21:00:00', '2026-09-11T06:00:00'],
  ['tomorrow morning', '2026-09-11T06:00:00', '2026-09-11T12:00:00'],
  ['yesterday afternoon', '2026-09-09T12:00:00', '2026-09-09T17:00:00'],
  // 'explicit timezone instants': [
  // Timestamp expectations are normalized to UTC, including date rollovers.

  // 'named holidays': [
  ["New Year's Eve 2026", '2026-12-31'],
  ["New Year's Day 2027", '2027-01-01'],
  ["Valentine's Day 2027", '2027-02-14'],
  // 'dates inside ordinary sentences'
  ['Ask April to call on October 5, 2026.', '2026-10-05'],
  ['We may need 12 chairs by September 15, 2026.', '2026-09-15'],
  ['I visited on May 5.', '2026-05-05'],
  ['We met in March.', '2026-03-01', '2026-03-31'],
  ["Don't come today; come tomorrow instead.", '2026-09-11'],
  ['Move the meeting from Friday to Saturday.', '2026-09-12'],
  ['Not September 12, 2026 — September 13, 2026.', '2026-09-13'],
  // 'avoid greedy non-date interpretations': [
  ['I spoke with May about the budget.', null],
  ['I met August at the station.', null],
  ['Version 10.11.12 is installed.', null],
  ['I live at 12 March Street.', null],
  ['There are seven days in a week.', null],
  ['It is the third quarter of the game.', null],
  ['A good morning routine helps.', null],
  ['The Sunday Times published it.', null],
  ['Friday is a character in the novel.', null],
  // 'invalid or unresolved expressions': [
  // Reject invalid concrete dates rather than clamp or silently discard the time.
  ['February 30, 2026', null],
  ['February 29, 2027', null],
  ['February 29, 1900', null],
  ['February 29, 2100', null],
  ['April 31, 2026', null],
  ['June 31, 2026', null],
  ['September 31, 2026', null],
  ['November 31, 2026', null],
  ['January 0, 2026', null],
  ['January 32, 2026', null],
  ['2026-13-10', null],
  ['2026-00-10', null],
  ['2026-09-00', null],
  ['2026-02-30', null],
  ['tomorrow at 25:00', null],
  ['tomorrow at 2:62pm', null],
  ['tomorrow at 13pm', null],
  ['tomorrow at 10:30:99', null],
  ['the fifth Monday of February 2027', null],
  ['September 12, 2026 to September 10, 2026', null],
  ['Friday, September 10, 2026', null], // Conflicting weekday and date.
  ['someday', null],
  ['a while ago', null],
  ['three days after it happened', null],
  ['september 222', null],
  ['nov 42nd', null],
  ['222nd of august', null],
  ['February 30, 2026', null],
]

test(here, t => {
  arr.forEach(row => checkDate(t, nlp, context, row))
  t.end()
})
