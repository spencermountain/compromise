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
  [' may or june', ['may 1', 'june 1']],

  // dependant date combos
  ['march 3rd and 4th', ['mar 3', 'mar 4']],
  ['feb 2 or third', ['feb 2nd', 'feb 3']],
  ['february 5th, 6th or 7th', ['feb 5', 'feb 6', 'feb 7']],
  ['february 5th, 6th and 7th', ['feb 5', 'feb 6', 'feb 7']],
  ['sept or june 1998', ['sept 1 1998', 'june 1 1998']],
  ['3, 4, or 5 of Feb 1998', ['feb 3 1998', 'feb 4 1998', 'feb 5 1998']],
  ['3, 4, or 5 of February', ['feb 3', 'feb 4', 'feb 5']],
  ['jan 22, 23, 28', ['jan 22', 'jan 23', 'jan 28']],
  // ['jan 22, 23, 28 1998', ['jan 22 1998', 'jan 23 1998', 'jan 28 1998']],
  // ['', ['', '', '']],
]

test('multi-dates', function (t) {
  arr.forEach((a) => {
    let found = nlp(a[0]).dates(context).get()
    t.equal(found.length, a[1].length, '[length] ' + a[0])
    a[1].forEach((str, i) => {
      let one = nlp(str).dates(context).get(0)
      t.equal((found[i] || {}).start, one.start, `[combo: ${str}] '${a[0]}'`)
    })
  })
  t.end()
})
