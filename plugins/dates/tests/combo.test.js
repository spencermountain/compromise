import test from 'tape'
import nlp from './_lib.js'

const context = {
  today: '2021-04-17', //saturday
  timezone: 'Canada/Eastern',
}

const arr = [
  // independant dates
  ['tomorrow, tuesday, wednesday', ['apr 18', 'apr 20', 'apr 21']],
  ['mon, tuesday', ['apr 19', 'apr 20']],
  ['mon, tuesday, wednesday', ['apr 19', 'apr 20', 'apr 21']],
  ['jan 2 or jan 4', ['jan 2nd', 'jan 4th']],
  ['jan 6 and jan 9', ['jan 6th', 'jan 9th']],
  ['between jan 5 and jan 10', ['jan 5-10']],
  ['feb 5 or next weekend', ['february 5', 'apr 24']],
  ['next friday, this monday', ['fri 23', 'mon 19']],
  ['jan or feb', ['jan 1', 'feb 1']],
  ['january and in feb', ['jan 1', 'feb 1']],
  ['during march or september', ['march 1', 'september 1']],
  ['march, may, or june', ['march 1', 'may 1', 'june 1']],
  ['may or june', ['may 1', 'june 1']],
  ['sunday or monday', ['sunday 18', 'monday 19']],
  ['april 1 or may 2', ['april 1', 'may 2']],
  ['april 1 and may 2', ['april 1', 'may 2']],
  ['july 4 or july 5', ['july 4', 'july 5']],
  ['july 4 and july 5', ['july 4', 'july 5']],
  ['oct 31 or nov 1', ['oct 31', 'nov 1']],
  ['march 1 or april 2 2022', ['march 1 2022', 'april 2 2022']],
  ['in march or in april', ['march 1', 'april 1']],
  ['march and april', ['march 1', 'april 1']],
  ['march or june 2019', ['march 1 2019', 'june 1 2019']],
  ['during april or may', ['april 1', 'may 1']],
  ['january or february 2022', ['jan 1 2022', 'feb 1 2022']],
  ['only in 2018 and 2020', ['2018', '2020']],
  ['dec 25 or jan 1', ['dec 25', 'jan 1']],

  // dependant date combos
  // ['march 3rd and 4th', ['mar 3', 'mar 4']],
  ['june 3rd and 4th', ['jun 3', 'jun 4']],
  ['feb 2 or third', ['feb 2nd', 'feb 3']],
  ['february 5th, 6th or 7th', ['feb 5', 'feb 6', 'feb 7']],
  ['february 5th, 6th and 7th', ['feb 5', 'feb 6', 'feb 7']],
  ['sept or june 1998', ['sept 1 1998', 'june 1 1998']],
  ['3, 4, or 5 of Feb 1998', ['feb 3 1998', 'feb 4 1998', 'feb 5 1998']],
  ['3, 4, or 5 of February', ['feb 3', 'feb 4', 'feb 5']],
  ['jan 22, 23, 28', ['jan 22', 'jan 23', 'jan 28']],
  ['jan 22, 23, 28 1998', ['jan 22 1998', 'jan 23 1998', 'jan 28 1998']],
  ['jan 5 or 8', ['jan 5th', 'jan 8th']],
  ['jan 5 and 8', ['jan 5th', 'jan 8th']],
  ['jan 5 8', ['jan 5th', 'jan 8th']],
  ['5 or 8 of jan', ['jan 5th', 'jan 8th']],
  ['5 and 8 of jan', ['jan 5th', 'jan 8th']],
  ['4 or 5 of july', ['july 4', 'july 5']],
  ['4 and 5 of july', ['july 4', 'july 5']],
  ['1st or 2nd of march', ['mar 1', 'mar 2']],
  ['1 and 2 of march', ['mar 1', 'mar 2']],
  ['1, 2 and 3 of march', ['mar 1', 'mar 2', 'mar 3']],
  ['the 1st or 2nd of may', ['may 1', 'may 2']],
  ['april 5, 6, 7', ['apr 5', 'apr 6', 'apr 7']],
  ['aug 3 or 10', ['aug 3', 'aug 10']],
  ['aug 3 and 10', ['aug 3', 'aug 10']],
  ['3 or 4 of aug', ['aug 3', 'aug 4']],
  ['sept 1, 2, 3', ['sept 1', 'sept 2', 'sept 3']],
  ['sept 1 2 3', ['sept 1', 'sept 2', 'sept 3']],
]

test('multi-dates', function (t) {
  arr.forEach((a) => {
    const found = nlp(a[0]).dates(context).get()
    t.equal(found.length, a[1].length, '[length] ' + a[0])
    a[1].forEach((str, i) => {
      const one = nlp(str).dates(context).get()[0]
      t.equal((found[i] || {}).start, one.start, `[combo: ${str}] '${a[0]}'`)
    })
  })
  t.end()
})
