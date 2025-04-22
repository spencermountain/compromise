import test from 'tape'
import nlp from './_lib.js'

const context = {
  today: '2020-01-21',
  timezone: 'Canada/Pacific',
}

const arr = [
  // explicit-dates
  [`march 2nd`, '2020-03-02T00:00:00.000-08:00'],
  [`2 march`, '2020-03-02T00:00:00.000-08:00'],
  [`tues march 2`, '2020-03-02T00:00:00.000-08:00'],
  [`march the second`, '2020-03-02T00:00:00.000-08:00'],
  [`on the 2nd of march`, '2020-03-02T00:00:00.000-08:00'],

  // numerical-dates
  [`1999/03/02`, 'march 2 1999'],
  [`1999-03-02`, 'march 2 1999'],
  [`03-02-1999`, 'march 2nd 1999'],
  [`03/02`, 'march 2'],
  [`2015.08.13`, 'aug 13 2015'],

  // named-dates
  [`today`, '2020-01-21'],
  [`now`, 'right now'],
  [`q1`, 'jan 1'],
  [`tomorrow`, '2020-01-22'],

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
  [`aug-20`, '20-aug'],
  [`in a few years`, `in 2 years`],
  [`in a couple years`, `in 2 years`],
  [`2 weeks back`, `2 weeks ago`],
  [`last q1`, `q1 2019`],
  [`last q2`, `q2 2019`],
  [`last q3`, `q3 2019`],
  [`last q4`, `q4 2019`],
  [`this q1`, `q1 2020`],
  [`this q2`, `q2 2020`],
  [`this q3`, `q3 2020`],
  [`this q4`, `q4 2020`],
  [`next q1`, `q1 2021`],
  [`next q2`, `q2 2021`],
  [`next q3`, `q3 2021`],
  [`next q4`, `q4 2021`],
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
  [`march this year`, `2020-03-01`],
  [`march next year`, `2021-03-01`],
  [`march last year`, `2019-03-01`],
  ['this fri, monday', 'fri jan 24 and mon jan 27'],
  ['next friday, this monday', 'fri jan 31 and mon jan 27'],
  ['until christmas', '2020-01-21 to 2020-12-25'],
  ['until feb 3 2024', '2020-01-21 to 2024-02-03'],
  ['first half of march', '2020-03-01 to 2020-03-16'],
  ['second half of march', '2020-03-16 to 2020-03-30 '],
  ['between Sept and Oct', 'sept 2020 to oct 2020'],
  ['between Sept and Oct 2008', 'sept 2008 to oct 2008'],
  ['between Oct and Sept', 'sept 2020 to oct 2020'],
  ['between Oct and Sept 2008', 'sept 2008 to oct 2008'],
  // relative dates
  [`in 3 days`, '2020-01-24'],
  [`in 1 week`, '2020-01-28'],
  [`in 2 months`, '2020-03-21'],
  [`in 1 year`, '2021-01-21'],
  [`2 days ago`, '2020-01-19'],
  [`1 week ago`, '2020-01-14'],
  [`2 months ago`, '2019-11-21'],
  [`1 year ago`, '2019-01-21'],

  // day of the week
  [`next monday`, '2020-01-27'],
  [`next tuesday`, '2020-01-28'],
  [`last sunday`, '2020-01-19'],
  [`last wednesday`, '2020-01-15'],
  [`last saturday`, '2020-01-18'],

  // time with timezone
  [`2pm Canada/Pacific`, '2020-01-21T14:00:00.000-08:00'],
  [`2pm Canada/Eastern`, '2020-01-21T14:00:00.000-05:00'],
  [`2pm UTC`, '2020-01-21T14:00:00.000+00:00'],

  // date range
  [`from jan 1 to jan 5`, '2020-01-01 to 2020-01-05'],
  [`from jan 1 to feb 1`, '2020-01-01 to 2020-02-01'],
  [`from jan 1 2020 to jan 5 2021`, '2020-01-01 to 2021-01-05'],
  [`from jan 1 2020 to feb 1 2021`, '2020-01-01 to 2021-02-01'],
  [`between jan 1 and jan 5`, '2020-01-01 to 2020-01-05'],
  [`between jan 1 and feb 1`, '2020-01-01 to 2020-02-01'],
  [`between jan 1 2020 and jan 5 2021`, '2020-01-01 to 2021-01-05'],
  [`between jan 1 2020 and feb 1 2021`, '2020-01-01 to 2021-02-01'],

  // additional explicit-dates
  [`march 3rd`, '2020-03-03T00:00:00.000-08:00'],
  [`3 march`, '2020-03-03T00:00:00.000-08:00'],
  [`wed march 4`, '2020-03-04T00:00:00.000-08:00'],
  [`march the third`, '2020-03-03T00:00:00.000-08:00'],
  [`on the 3rd of march`, '2020-03-03T00:00:00.000-08:00'],

  // additional numerical-dates
  [`1999/03/03`, 'march 3 1999'],
  [`1999-03-03`, 'march 3 1999'],
  [`03-03-1999`, 'march 3rd 1999'],
  [`03/03`, 'march 3'],
  [`2015.08.14`, 'aug 14 2015'],

  // additional named-dates
  [`yesterday`, '2020-01-20'],
  [`q2`, 'apr 1'],
  [`next month`, '2020-02-01'],

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
  [`sep-20`, '20-sep'],
  [`in a few months`, `in 2 months`],
  [`in a couple months`, `in 2 months`],
  [`2 weeks from now`, `2 weeks from today`],
  [`next q1`, `q1 2021`],
  [`next q2`, `q2 2021`],
  [`next q3`, `q3 2021`],
  [`next q4`, `q4 2021`],
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
  [`march this year`, `2020-03-01`],
  [`march next year`, `2021-03-01`],
  [`march last year`, `2019-03-01`],
  ['this fri, next monday', 'fri jan 24 and mon jan 31'],
  ['next friday, next monday', 'fri jan 31 and mon jan 31'],
  ['until next christmas', '2020-01-21 to 2021-12-25'],
  ['until feb 3 2025', '2020-01-21 to 2025-02-03'],
  ['between Oct and Sept 2022', 'sept 2022 to oct 2022'],
  ['between Oct and Sept 2023', 'sept 2023 to oct 2023'],
  // additional relative dates
  [`in 4 days`, '2020-01-25'],
  [`in 2 weeks`, '2020-02-04'],
  [`in 3 months`, '2020-04-21'],
  [`in 2 years`, '2022-01-21'],
  [`3 days ago`, '2020-01-18'],
  [`2 weeks ago`, '2020-01-07'],
  [`3 months ago`, '2019-10-21'],
  [`2 years ago`, '2018-01-21'],

  // additional day of the week
  [`last monday`, '2020-01-13'],
  [`last tuesday`, '2020-01-14'],
  [`last friday`, '2020-01-17'],

  // additional time with timezone
  [`3pm Canada/Pacific`, '2020-01-21T15:00:00.000-08:00'],
  [`3pm Canada/Eastern`, '2020-01-21T15:00:00.000-05:00'],
  [`3pm UTC`, '2020-01-21T15:00:00.000+00:00'],

  // additional date range
  [`from jan 6 to jan 10`, '2020-01-06 to 2020-01-10'],
  [`from jan 6 to feb 6`, '2020-01-06 to 2020-02-06'],
  [`from jan 6 2020 to jan 10 2021`, '2020-01-06 to 2021-01-10'],
  [`from jan 6 2020 to feb 6 2021`, '2020-01-06 to 2021-02-06'],
  [`between jan 6 and jan 10`, '2020-01-06 to 2020-01-10'],
  [`between jan 6 and feb 6`, '2020-01-06 to 2020-02-06'],
  [`between jan 6 2020 and jan 10 2021`, '2020-01-06 to 2021-01-10'],
  [`between jan 6 2020 and feb 6 2021`, '2020-01-06 to 2021-02-06'],

]

test('date-variety', function (t) {
  arr.forEach((a) => {
    const left = nlp(a[0]).dates(context).json()[0] || {}
    const right = nlp(a[1]).dates(context).json()[0] || {}
    left.dates = left.dates || {}
    right.dates = right.dates || {}
    t.equal(left.dates.start, right.dates.start, a[0] + ' -> ' + a[1])
  })
  t.end()
})
